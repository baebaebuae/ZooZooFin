package com.zzf.backend.domain.member.controller;

import com.zzf.backend.domain.member.dto.MyAnimalResponse;
import com.zzf.backend.domain.member.dto.ProfileResponse;
import com.zzf.backend.domain.member.service.MemberService;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/profile")
    public ResponseDto<ProfileResponse> getMyProfile(@RequestHeader String memberId) {
        ProfileResponse profile = memberService.getProfile(memberId);

        return ResponseDto.success(PROFILE_SUCCESS, profile);
    }

    @GetMapping("/animal")
    public ResponseDto<MyAnimalResponse> getMyAnimalList(@RequestHeader String memberId) {
        MyAnimalResponse myAnimal = memberService.getMyAnimalList(memberId);

        return ResponseDto.success(MY_ANIMAL_SUCCESS, myAnimal);
    }

}
