package com.zzf.backend.global.auth.security;

import com.zzf.backend.global.auth.user.GoogleUserInfo;
import com.zzf.backend.global.auth.user.KakaoUserInfo;
import com.zzf.backend.global.auth.user.NaverUserInfo;
import com.zzf.backend.global.auth.user.UserRole;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@Getter
public final class CustomOAuth2User implements OAuth2User {

    private final OAuth2Provider providerName;
    private final String providerId;
    private final String username;
    private final Map<String, Object> attributes;
    private final UserRole authorities;

    CustomOAuth2User(KakaoUserInfo kakaoUserInfo, String username, Map<String, Object> attributes) {
        this.providerName = OAuth2Provider.kakao;
        this.providerId = kakaoUserInfo.id();
        this.username = username;
        this.attributes = attributes;
        this.authorities = UserRole.USER;
    }

    CustomOAuth2User(NaverUserInfo naverUserInfo, String username, Map<String, Object> attributes) {
        this.providerName = OAuth2Provider.naver;
        this.providerId = naverUserInfo.id();
        this.username = username;
        this.attributes = attributes;
        this.authorities = UserRole.USER;
    }

    CustomOAuth2User(GoogleUserInfo googleUserInfo, String username, Map<String, Object> attributes) {
        this.providerName = OAuth2Provider.google;
        this.providerId = googleUserInfo.sub();
        this.username = username;
        this.attributes = attributes;
        this.authorities = UserRole.USER;
    }

    @Override
    public String getName() {
        return username;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(authorities);
    }

}