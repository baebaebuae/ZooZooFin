package com.zzf.backend.domain.auth.service;

import com.zzf.backend.domain.auth.dto.ReissueResponse;

public interface AuthService {
    void logout(String accessToken);

    ReissueResponse reissue(String accessToken, String refreshToken);
}
