package com.zzf.backend.global.auth.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.animal.status.HierarchyStatus;
import com.zzf.backend.domain.member.dto.MyAnimalResponse;
import com.zzf.backend.domain.member.dto.ProfileResponse;
import com.zzf.backend.global.auth.entity.Member;
import com.zzf.backend.global.auth.repository.MemberRepository;
import com.zzf.backend.global.auth.security.CustomOAuth2User;
import com.zzf.backend.global.auth.security.OAuth2Provider;
import com.zzf.backend.global.exception.CustomException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.zzf.backend.global.status.ErrorCode.ANIMAL_NOT_FOUND_EXCEPTION;
import static com.zzf.backend.global.status.ErrorCode.MEMBER_NOT_FOUND_EXCEPTION;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AnimalRepository animalRepository;

    @Override
    public void join(CustomOAuth2User customOAuth2User) {
        memberRepository.save(Member.builder()
                .providerName(customOAuth2User.getProviderName())
                .providerId(customOAuth2User.getProviderId())
                .username(customOAuth2User.getUsername())
                .goldBar(0L)
                .isSolvedQuiz(false)
                .bankCount(0L)
                .loanCount(0L)
                .stockCount(0L)
                .build());
    }

    @Override
    public Optional<Member> getIdByUsername(String username) {
        return memberRepository.findByUsername(username);
    }

    @Override
    public String getUsernameOrUUID(OAuth2Provider provider, String providerId) {
        return memberRepository.findByProviderNameAndProviderId(provider, providerId)
                .map(Member::getUsername)
                .orElseGet(UUID.randomUUID()::toString);
    }

    @Override
    public ProfileResponse getProfile(String memberId) {
        Member member = memberRepository.findByUsername(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        Animal animal = animalRepository.findByMemberAndIsEndFalse(member)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        animal.setHierarchy(HierarchyStatus.getHierarchy(animal.getAssets()).getHierarchyName());

        return ProfileResponse.builder()
                .animalImg(animal.getAnimalType().getAnimalImgUrl())
                .animalAssets(animal.getAssets())
                .memberGoldBar(member.getGoldBar())
                .turn(animal.getTurn())
                .build();
    }

    @Override
    public MyAnimalResponse getMyAnimalList(String memberId) {
        Member member = memberRepository.findByUsername(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        List<Animal> animalList = animalRepository.findAllByMember(member);

        return new MyAnimalResponse(animalList);
    }
}