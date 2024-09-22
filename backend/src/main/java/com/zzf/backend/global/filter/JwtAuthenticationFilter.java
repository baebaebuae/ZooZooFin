package com.zzf.backend.global.filter;

import com.zzf.backend.global.jwt.CustomCachingRequestWrapper;
import com.zzf.backend.global.jwt.JwtProvider;
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

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    private final String[] EXCLUDE_URI = {
            "/api/v1/auth", "/api/v1/oauth"
    };

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        CustomCachingRequestWrapper requestWrapper = new CustomCachingRequestWrapper(request);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

        String accessToken = jwtProvider.getAccessTokenFromHeader(request);
        Long animalId = jwtProvider.getAnimalIdFromAccessToken(accessToken);
        requestWrapper.addHeader("animalId", animalId.toString());

        filterChain.doFilter(requestWrapper, responseWrapper);
        responseWrapper.copyBodyToResponse();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        return Arrays.stream(EXCLUDE_URI).anyMatch(path::startsWith);
    }
}
