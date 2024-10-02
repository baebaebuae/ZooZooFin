package com.zzf.backend.global.auth.service;

import com.zzf.backend.domain.member.dto.MyAnimalResponse;
import com.zzf.backend.domain.member.dto.ProfileResponse;
import com.zzf.backend.global.auth.entity.Member;
import com.zzf.backend.global.auth.security.CustomOAuth2User;
import com.zzf.backend.global.auth.security.OAuth2Provider;

import java.util.Optional;

public interface MemberService {
    void join(CustomOAuth2User joinUser);

    Optional<Member> getIdByUsername(String username);

    String getUsernameOrUUID(OAuth2Provider provider, String providerId);

    ProfileResponse getProfile(String memberId);

    MyAnimalResponse getMyAnimalList(String memberId);
}