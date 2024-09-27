package com.zzf.backend.domain.auth.controller;

import com.zzf.backend.domain.auth.dto.LoginResponse;
import com.zzf.backend.domain.auth.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth")
public class OAuthController {

    private final OAuthService OAuthService;

    @GetMapping("/{provider}")
    public RedirectView loginRedirect(@PathVariable String provider) {
        String redirectUrl = OAuthService.getRedirectUrl(provider);

        return new RedirectView(redirectUrl);
    }

    @GetMapping("/callback/{provider}")
    public void callback(@PathVariable String provider,
                         @RequestParam String code,
                         HttpServletRequest request,
                         HttpServletResponse response) throws IOException {
        LoginResponse loginResp = OAuthService.loginOAuth(provider, code);

        String redirectUrl = new StringBuilder()
                .append(request.getScheme()).append("://")
                .append(request.getServerName())
                .append(":").append(request.getServerPort())
                .append("/callback")
                .append("?accessToken=").append(loginResp.accessToken())
                .append("&refreshToken=").append(loginResp.refreshToken())
                .toString();

        response.setStatus(LOGIN_SUCCESS.getHttpStatus());
        response.sendRedirect(redirectUrl.toString());
    }
}
