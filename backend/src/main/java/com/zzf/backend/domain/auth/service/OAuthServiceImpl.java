package com.zzf.backend.domain.auth.service;

import com.zzf.backend.domain.auth.dto.KakaoTokenDto;
import com.zzf.backend.domain.auth.dto.KakaoUserDto;
import com.zzf.backend.domain.auth.dto.LoginResponse;
import com.zzf.backend.global.exception.CustomException;
import com.zzf.backend.global.jwt.JwtProvider;
import com.zzf.backend.global.redis.entity.RefreshToken;
import com.zzf.backend.global.redis.repository.RefreshTokenRepository;
import io.netty.handler.codec.http.HttpHeaderValues;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.zzf.backend.global.status.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${oauth.google.secret}")
    private String googleClientId;
    @Value("${oauth.naver.secret}")
    private String naverClientId;
    @Value("${oauth.kakao.secret}")
    private String kakaoClientId;

    private final String NAVER_TOKEN_HOST = "https://nid.naver.com";
    private final String KAKAO_TOKEN_HOST = "https://kauth.kakao.com";
    private final String KAKAO_USER_HOST = "https://kapi.kakao.com";

    @Value("${oauth.base-url}")
    private String baseUrl;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    @Override
    public String getRedirectUrl(String provider) {
        return switch (provider) {
            case "google" -> "https://accounts.google.com/o/oauth2/auth" +
                    "client_id=" + googleClientId +
                    "&redirect_uri=" + baseUrl + "/api/v1/oauth/callback/google" +
                    "&response_type=code";
            case "naver" -> NAVER_TOKEN_HOST + "/oauth2.0/authorize" +
                    "?client_id=" + naverClientId +
                    "&redirect_uri=" + baseUrl + "/api/v1/oauth/callback/naver" +
                    "&response_type=code";
            case "kakao" -> KAKAO_TOKEN_HOST + "/oauth/authorize" +
                    "?client_id=" + kakaoClientId +
                    "&redirect_uri=" + baseUrl + "/api/v1/oauth/callback/kakao" +
                    "&response_type=code";

            default -> throw new CustomException(WRONG_PROVIDER);
        };
    }

    @Override
    public LoginResponse loginOAuth(String provider, String code) {
        switch (provider) {
            case "kakao" -> {
                KakaoTokenDto tokenDto = WebClient.create(KAKAO_TOKEN_HOST)
                        .post()
                        .uri(uriBuilder -> uriBuilder
                                .scheme("https")
                                .path("/oauth/token")
                                .queryParam("grant_type", "authorization_code")
                                .queryParam("client_id", kakaoClientId)
                                .queryParam("code", code)
                                .build(true))
                        .header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
                        .retrieve()
                        .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new CustomException(KAKAO_PARAMETER_ERROR)))
                        .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> Mono.error(new CustomException(KAKAO_SERVER_ERROR)))
                        .bodyToMono(KakaoTokenDto.class)
                        .block();

                KakaoUserDto userDto = WebClient.create(KAKAO_USER_HOST)
                        .get()
                        .uri(uriBuilder -> uriBuilder
                                .scheme("https")
                                .path("/v2/user/me")
                                .build(true))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenDto.accessToken)
                        .header(HttpHeaders.CONTENT_TYPE, HttpHeaderValues.APPLICATION_X_WWW_FORM_URLENCODED.toString())
                        .retrieve()
                        .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> Mono.error(new CustomException(KAKAO_PARAMETER_ERROR)))
                        .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> Mono.error(new CustomException(KAKAO_SERVER_ERROR)))
                        .bodyToMono(KakaoUserDto.class)
                        .block();

                String memberId = userDto.id.toString();
                String accessToken = jwtProvider.createAccessToken(memberId);
                String refreshToken = jwtProvider.createRefreshToken();

                refreshTokenRepository.save(RefreshToken.builder()
                        .refreshToken(refreshToken)
                        .accessToken(accessToken)
                        .memberId(memberId)
                        .expiresIn(refreshExpiration)
                        .build());

                return LoginResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
            }
        }

        throw new CustomException(BAD_REQUEST);
    }
}
