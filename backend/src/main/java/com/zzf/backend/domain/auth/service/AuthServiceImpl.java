package com.zzf.backend.domain.auth.service;

import com.zzf.backend.domain.auth.dto.LoginResponse;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.zzf.backend.global.status.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    @Value("${oauth.google.secret}")
    private String googleClientId;
    @Value("${oauth.naver.secret}")
    private String naverClientId;
    @Value("${oauth.kakao.secret}")
    private String kakaoClientId;

    private final String NAVER_TOKEN_HOST = "https://nid.naver.com";


    private final String KAKAO_TOKEN_HOST = "https://kauth.kakao.com";
    private final String KAKAO_USER_HOST = "https://kapi.kakao.com";

    @Value("${base-url}")
    private String baseUrl;

    @Override
    public String getRedirectUrl(String provider) {
        return switch (provider) {
            case "google" -> "https://accounts.google.com/o/oauth2/auth" +
                    "client_id=" + googleClientId +
                    "&redirect_uri=" + baseUrl + "/api/v1/auth/callback/google" +
                    "&response_type=code";
            case "naver" -> NAVER_TOKEN_HOST + "/oauth2.0/authorize" +
                    "?client_id=" + naverClientId +
                    "&redirect_uri=" + baseUrl + "/api/v1/auth/callback/naver" +
                    "&response_type=code";
            case "kakao" -> KAKAO_TOKEN_HOST + "/oauth/authorize" +
                    "?client_id=" + kakaoClientId +
                    "&redirect_uri=" + baseUrl + "/api/v1/auth/callback/kakao" +
                    "&response_type=code";

            default -> throw new CustomException(WRONG_PROVIDER);
        };
    }

    @Override
    public LoginResponse loginOAuth(String provider, String code) {
        return null;
    }
}
