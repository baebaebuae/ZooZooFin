package com.zzf.backend.domain.savings.controller;

import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.dto.SavingsDeleteRequest;
import com.zzf.backend.domain.savings.dto.SavingsRequest;
import com.zzf.backend.domain.savings.dto.SavingsTypeResponse;
import com.zzf.backend.domain.savings.service.SavingsService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@Tag(name = "Savings", description = "Savings API, 적금 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/savings")
public class SavingsController {

    private final SavingsService savingsService;

    //적금 조회 004
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "적금 조회 성공")
    })
    @Operation(summary = "적금 조회", description = "등록할 수 있는 적금 상품 목록을 보여줌.")
    @GetMapping
    public ResponseDto<List<SavingsTypeResponse>> getSavings(){

        List<SavingsTypeResponse> savingsTypeResponseList = savingsService.getSavings();
        return ResponseDto.success(READ_SUCCESS, savingsTypeResponseList);
    }

    //적금 등록 005
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "적금 등록 성공")
    })
    @Operation(summary = "적금 등록", description = "적금을 등록함.")
    @PostMapping
    public ResponseDto<Void> postSavings(@RequestHeader Long animalId,
                                         @RequestBody SavingsRequest savingsRequest){

        savingsService.postSavings(animalId, savingsRequest);

        return ResponseDto.success(CREATE_SUCCESS);
    }


    //적금 해지_내 적금 조회 006
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "내 적금 조회 성공")
    })
    @Operation(summary = "내 적금 조회", description = "내가 등록한 적금 목록을 보여줌.")
    @GetMapping("/my")
    public ResponseDto<List<MySavingsResponse>> getMySavings(@RequestHeader Long animalId){

        List<MySavingsResponse> mySavingsResponseList = savingsService.getMySavings(animalId);

        return ResponseDto.success(READ_SUCCESS, mySavingsResponseList);
    }

    //적금 해지 006_1
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "적금 해지 성공")
    })
    @Operation(summary = "적금 해지", description = "적금을 해지함.")
    @PatchMapping("/my")
    public ResponseDto<Void> deleteMySavings(@RequestHeader Long animalId,
                                             @RequestBody SavingsDeleteRequest savingsDeleteRequest){
        Long savingsId = savingsDeleteRequest.getSavingsId();

        savingsService.deleteMySavings(animalId, savingsId);

        return ResponseDto.success(UPDATE_SUCCESS);
    }
}
