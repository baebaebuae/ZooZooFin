package com.zzf.backend.domain.deposit.controller;

import com.zzf.backend.domain.deposit.dto.DepositDeleteRequest;
import com.zzf.backend.domain.deposit.dto.DepositRequest;
import com.zzf.backend.domain.deposit.dto.DepositTypeResponse;
import com.zzf.backend.domain.deposit.dto.MyDepositResponse;
import com.zzf.backend.domain.deposit.service.DepositService;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@Tag(name = "Deposit", description = "Deposit API, 예금 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/deposit")
public class DepositController {

    private final DepositService depositService;

    //예금 조회 001
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "예금 조회 성공")
    })
    @Operation(summary = "예금 조회", description = "등록할 수 있는 예금 상품 목록을 보여줌.")
    @GetMapping
    public ResponseDto<List<DepositTypeResponse>> getDeposit(){

        List<DepositTypeResponse> depositTypeResponseList = depositService.getDeposit();

        return ResponseDto.success(READ_SUCCESS, depositTypeResponseList);
    }

    //예금 등록 002
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "예금 등록 성공")
    })
    @Operation(summary = "예금 등록", description = "예금을 등록함.")
    @PostMapping
    public ResponseDto<Void> postDeposit(@AnimalId Long animalId,
                                         @RequestBody DepositRequest depositRequest){
        depositService.postDeposit(animalId, depositRequest);

        return ResponseDto.success(CREATE_SUCCESS);
    }

    //예금 해지_내 예금 조회 003
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "내 예금 조회 성공")
    })
    @Operation(summary = "내 예금 조회", description = "내 예금 목록을 보여줌.")
    @GetMapping("/my")
    public ResponseDto<List<MyDepositResponse>> getMyDeposit(@AnimalId Long animalId){

        List<MyDepositResponse> myDepositResponseList = depositService.getMyDeposit(animalId);

        return ResponseDto.success(READ_SUCCESS, myDepositResponseList);
    }

    //예금 해지 003_1
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "예금 해지 성공")
    })
    @Operation(summary = "예금 해지", description = "예금을 해지함.")
    @PatchMapping("/my")
    public ResponseDto<Void> deleteMyDeposit(@AnimalId Long animalId,
                                             @RequestBody DepositDeleteRequest depositDeleteRequest){
        Long depositId = depositDeleteRequest.getDepositId();

        depositService.deleteMyDeposit(animalId, depositId);

        return ResponseDto.success(UPDATE_SUCCESS);
    }
}
