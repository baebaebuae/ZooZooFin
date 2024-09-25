package com.zzf.backend.global.filter;

import com.zzf.backend.global.exception.CustomException;
import com.zzf.backend.global.jwt.CustomCachingRequestWrapper;
import com.zzf.backend.global.jwt.JwtProvider;
import com.zzf.backend.global.redis.repository.LogoutRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.Arrays;

import static com.zzf.backend.global.status.ErrorCode.*;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final LogoutRepository logoutRepository;
    private final JwtProvider jwtProvider;

    private final String[] EXCLUDE_URI = {
            "/api/v1/oauth", "/api/v1/auth/reissue", "/swagger-ui", "/api-docs", "/v3/api-docs",
    };

    private final String[] ACCESS_TOKEN_URI = {
            "/api/v1/auth"
    };

    private final String[] MEMBER_ID_URI = {
            "/api/v1/member", "/api/v1/animal"
    };

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        CustomCachingRequestWrapper requestWrapper = new CustomCachingRequestWrapper(request);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

        String accessToken = jwtProvider.getAccessTokenFromRequest(request);
        jwtProvider.validateAccessToken(accessToken);

        boolean isLogout = logoutRepository.findById(accessToken).isPresent();
        if (isLogout) {
            throw new CustomException(ALREADY_LOGOUT);
        }

        String requestURI = requestWrapper.getRequestURI();
        if (Arrays.stream(ACCESS_TOKEN_URI).anyMatch(requestURI::startsWith)) {
            requestWrapper.addHeader("accessToken", accessToken);
        } else if (Arrays.stream(MEMBER_ID_URI).anyMatch(requestURI::startsWith)) {
            String memberId = jwtProvider.getMemberIdFromAccessToken(accessToken);
            requestWrapper.addHeader("memberId", memberId);
        } else {
            Long animalId = jwtProvider.getAnimalIdFromAccessToken(accessToken);
            requestWrapper.addHeader("animalId", animalId.toString());
        }

        filterChain.doFilter(requestWrapper, responseWrapper);
        responseWrapper.copyBodyToResponse();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        return Arrays.stream(EXCLUDE_URI).anyMatch(path::startsWith);
    }
}
