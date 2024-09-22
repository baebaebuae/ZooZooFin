package com.zzf.backend.domain.auth.service;

import com.zzf.backend.domain.auth.dto.LoginResponse;

public interface OAuthService {
    String getRedirectUrl(String provider);

    LoginResponse loginOAuth(String provider, String code);
}
