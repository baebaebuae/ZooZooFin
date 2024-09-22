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
    public ResponseDto<ProfileResponse> getMyProfile(@RequestHeader Long animalId) {
        ProfileResponse profile = memberService.getProfile(animalId);

        return ResponseDto.success(GET_PROFILE_OK, profile);
    }

    @GetMapping("/animal")
    public ResponseDto<MyAnimalResponse> getMyAnimalList(@RequestHeader Long animalId) {
        MyAnimalResponse myAnimal = memberService.getMyAnimalList(animalId);

        return ResponseDto.success(GET_MY_ANIMAL_OK, myAnimal);
    }

}
