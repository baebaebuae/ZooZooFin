package com.zzf.backend.domain.savings.controller;

import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.dto.SavingsDeleteRequest;
import com.zzf.backend.domain.savings.dto.SavingsRequest;
import com.zzf.backend.domain.savings.dto.SavingsTypeResponse;
import com.zzf.backend.domain.savings.service.SavingsService;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/savings")
public class SavingsController {

    private final SavingsService savingsService;

    //적금 조회 004
    @GetMapping
    public ResponseDto<List<SavingsTypeResponse>> getSavings() {

        List<SavingsTypeResponse> savingsTypeResponseList = savingsService.getSavings();
        return ResponseDto.success(READ_SUCCESS, savingsTypeResponseList);
    }

    //적금 등록 005
    @PostMapping
    public ResponseDto<Void> postSavings(@AnimalId Long animalId,
                                         @RequestBody SavingsRequest savingsRequest) {

        savingsService.postSavings(animalId, savingsRequest);

        return ResponseDto.success(CREATE_SUCCESS);
    }


    //적금 해지_내 적금 조회 006
    @GetMapping("/my")
    public ResponseDto<List<MySavingsResponse>> getMySavings(@AnimalId Long animalId) {

        List<MySavingsResponse> mySavingsResponseList = savingsService.getMySavings(animalId);

        return ResponseDto.success(READ_SUCCESS, mySavingsResponseList);
    }

    //적금 해지 006_1
    @PatchMapping("/my")
    public ResponseDto<Void> deleteMySavings(@AnimalId Long animalId,
                                             @RequestBody SavingsDeleteRequest savingsDeleteRequest) {
        Long savingsId = savingsDeleteRequest.getSavingsId();

        savingsService.deleteMySavings(animalId, savingsId);

        return ResponseDto.success(UPDATE_SUCCESS);
    }
}
