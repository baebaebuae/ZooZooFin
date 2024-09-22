package com.zzf.backend.domain.member.service;

import com.zzf.backend.domain.member.dto.MyAnimalResponse;
import com.zzf.backend.domain.member.dto.ProfileResponse;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

    @Override
    public ProfileResponse getProfile(Long animalId) {
        return null;
    }

    @Override
    public MyAnimalResponse getMyAnimalList(Long animalId) {
        return null;
    }
}
