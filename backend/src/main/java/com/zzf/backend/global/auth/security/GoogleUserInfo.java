package com.zzf.backend.global.auth.security;

import lombok.Builder;

@Builder
record GoogleUserInfo(String sub) {
}
