package com.zzf.backend.domain.auth.controller;

import com.zzf.backend.domain.auth.dto.LoginResponse;
import com.zzf.backend.domain.auth.service.AuthService;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/{provider}")
    public RedirectView loginRedirect(@PathVariable String provider) {
        String redirectUrl = authService.getRedirectUrl(provider);

        return new RedirectView(redirectUrl);
    }

    @GetMapping("/callback/{provider}")
    public ResponseDto<LoginResponse> callback(@PathVariable String provider,
                                               @RequestParam String code) {
        LoginResponse loginResp = authService.loginOAuth(provider, code);

        return ResponseDto.success(LOGIN_SUCCESS, loginResp);
    }
}
