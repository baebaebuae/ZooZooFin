package com.zzf.backend.domain.auth.dto;

import lombok.Builder;

@Builder
public record LoginResponse(
        Long userId,
        String accessToken,
        String refreshToken
) {
}
