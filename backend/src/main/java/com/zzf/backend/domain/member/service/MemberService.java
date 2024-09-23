package com.zzf.backend.domain.member.service;

import com.zzf.backend.domain.member.dto.MyAnimalResponse;
import com.zzf.backend.domain.member.dto.ProfileResponse;

public interface MemberService {
    ProfileResponse getProfile(String memberId);

    MyAnimalResponse getMyAnimalList(String memberId);
}
