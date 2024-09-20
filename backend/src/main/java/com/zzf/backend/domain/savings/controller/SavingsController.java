package com.zzf.backend.domain.savings.controller;

import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.dto.SavingsRequest;
import com.zzf.backend.domain.savings.dto.SavingsTypeResponse;
import com.zzf.backend.domain.savings.service.SavingsService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.zzf.backend.global.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/savings")
public class SavingsController {

    private final SavingsService savingsService;

    //적금 조회 004
    @GetMapping
    public ResponseDto<List<SavingsTypeResponse>> getSavings(){

        List<SavingsTypeResponse> savingsTypeResponseList = savingsService.getSavings();
        return ResponseDto.success(READ_SUCCESS, savingsTypeResponseList);
    }

    //적금 등록 005
    @PostMapping
    public ResponseDto<Void> postSavings(@RequestBody SavingsRequest savingsRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        savingsService.postSavings(savingsRequest, memberId);

        return ResponseDto.success(CREATE_SUCCESS);
    }


    //적금 해지_내 적금 조회 006
    @GetMapping("/my")
    public ResponseDto<List<MySavingsResponse>> getMySavings(){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        List<MySavingsResponse> mySavingsResponseList = savingsService.getMySavings(memberId);
        return ResponseDto.success(READ_SUCCESS, mySavingsResponseList);
    }

    //적금 해지 006_1
    @PatchMapping("/my")
    public ResponseDto<Void> deleteMySavings(@RequestBody Map<String, Long> mapRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";
        Long savingsId = mapRequest.get("savingsId");

        savingsService.deleteMySavings(memberId, savingsId);

        return ResponseDto.success(UPDATE_SUCCESS);
    }
}
