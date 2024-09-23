package com.zzf.backend.domain.member.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.member.dto.MyAnimalResponse;
import com.zzf.backend.domain.member.dto.ProfileResponse;
import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.domain.member.repository.MemberRepository;
import com.zzf.backend.global.exception.CustomException;
import com.zzf.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AnimalRepository animalRepository;

    @Override
    public ProfileResponse getProfile(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));
        animalRepository.findByMemberAndAnimalIsEndFalse(member);

        return ProfileResponse.builder().build();
    }

    @Override
    public MyAnimalResponse getMyAnimalList(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        List<Animal> animalList = animalRepository.findAllByMember(member);

        return new MyAnimalResponse(animalList);
    }
}
