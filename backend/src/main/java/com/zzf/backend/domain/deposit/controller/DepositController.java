package com.zzf.backend.domain.deposit.controller;

import com.zzf.backend.domain.deposit.dto.DepositRequest;
import com.zzf.backend.domain.deposit.dto.DepositTypeResponse;
import com.zzf.backend.domain.deposit.dto.MyDepositResponse;
import com.zzf.backend.domain.deposit.service.DepositService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/deposit")
public class DepositController {

    private final DepositService depositService;

    //예금 조회 001
    @GetMapping
    public ResponseDto<List<DepositTypeResponse>> getDeposit(){

        List<DepositTypeResponse> depositTypeResponseList = depositService.getDeposit();

        return ResponseDto.success(SuccessCode.READ_SUCCESS, depositTypeResponseList);
    }

    //예금 등록 002
    @PostMapping
    public ResponseDto<Void> postDeposit(@RequestBody DepositRequest depositRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        depositService.postDeposit(depositRequest, memberId);

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }

    //예금 해지_내 예금 조회 003
    @GetMapping("/my")
    public ResponseDto<List<MyDepositResponse>> getMyDeposit(){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        List<MyDepositResponse> myDepositResponseList = depositService.getMyDeposit(memberId);

        return ResponseDto.success(SuccessCode.READ_SUCCESS, myDepositResponseList);
    }

    //예금 해지 003_1
    @PatchMapping("/my")
    public ResponseDto<Void> deleteMyDeposit(@RequestBody Map<String, Long> mapRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";
        Long depositId = mapRequest.get("depositId");

        depositService.deleteMyDeposit(memberId, depositId);

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }
}
