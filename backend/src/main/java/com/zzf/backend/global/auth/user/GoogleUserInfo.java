package com.zzf.backend.global.auth.user;

import lombok.Builder;

@Builder
public record GoogleUserInfo(String sub) {
}
