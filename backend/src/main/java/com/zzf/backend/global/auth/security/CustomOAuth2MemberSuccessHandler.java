package com.zzf.backend.global.auth.security;

import com.zzf.backend.global.jwt.JwtProvider;
import com.zzf.backend.global.redis.entity.RefreshToken;
import com.zzf.backend.global.redis.repository.RefreshTokenRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    private static final String CALLBACK_URI = "/callback";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String accessToken = jwtProvider.createAccessToken(oAuth2User.getUsername());
        String refreshToken = jwtProvider.createRefreshToken();

        refreshTokenRepository.save(RefreshToken.builder()
                .refreshToken(refreshToken)
                .accessToken(accessToken)
                .memberId(oAuth2User.getUsername())
                .expiresIn(refreshExpiration)
                .build());

        String redirectUrl = UriComponentsBuilder.fromUriString(CALLBACK_URI)
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }


//        User user = userService.findByEmail(email);
//        Long userId = user.getUserId();
//        String username = user.getUsername();
//        user.setRefreshToken(refreshToken);
//        userService.saveUser(user);
//
//        String uri = createURI(accessToken, refreshToken, userId, username).toString();   // Access Token과 Refresh Token을 포함한 URL을 생성
//        getRedirectStrategy().sendRedirect(request, response, uri);   // sendRedirect() 메서드를 이용해 Frontend 애플리케이션 쪽으로 리다이렉트
}
