package com.zzf.backend.domain.bank.controller;

import com.zzf.backend.domain.bank.dto.*;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/bank")
public class BankController {

    //예금 조회 001
    @GetMapping("/deposit")
    public ResponseDto<List<DepositResponse>> getDeposit(){

        List<DepositResponse> depositResponseList = null;
        return ResponseDto.success(SuccessCode.READ_SUCCESS, depositResponseList);
    }

    //예금 등록 002
    @PostMapping("/deposit")
    public ResponseDto<Void> postDeposit(@RequestBody DepositRequest depositRequest){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }

    //예금 해지_내 예금 조회 003
    @GetMapping("/my-deposit")
    public ResponseDto<List<MyDepositResponse>> getMyDeposit(){
        // Header 에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        List<MyDepositResponse> myDepositResponseList = null;
        return ResponseDto.success(SuccessCode.READ_SUCCESS, myDepositResponseList);
    }

    //예금 해지 003_1
    @PatchMapping("/my-deposit")
    public ResponseDto<Void> deleteMyDeposit(@RequestBody Map<String, Long> mapRequest){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");
        Long depositId = mapRequest.get("depositId");

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }

    //적금 조회 004
    @GetMapping("/savings")
    public ResponseDto<List<SavingsResponse>> getSavings(){

        List<SavingsResponse> savingsDepositList = null;
        return ResponseDto.success(SuccessCode.READ_SUCCESS, savingsDepositList);
    }

    //적금 등록 005
    @PostMapping("/savings")
    public ResponseDto<Void> postSavings(@RequestBody SavingsRequest savingsRequest){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }


    //적금 해지_내 적금 조회 006
    @GetMapping("/my-savings")
    public ResponseDto<List<MySavingsResponse>> getMySavings(){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        List<MySavingsResponse> mySavingsResponseList = null;
        return ResponseDto.success(SuccessCode.READ_SUCCESS, mySavingsResponseList);
    }

    //적금 해지 006_1
    @PatchMapping("/my-savings")
    public ResponseDto<Void> deleteMySavings(@RequestBody Map<String, Long> mapRequest){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");
        Long savingsId = mapRequest.get("savingsId");

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }

    //대출 가능 조회 007
    @GetMapping("/loan/check")
    public ResponseDto<Map<String, Boolean>> checkLoanAvailable(){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        Map<String, Boolean> response = new HashMap<>();

        return ResponseDto.success(SuccessCode.READ_SUCCESS, response);
    }

    //대출 조회 상세 008
    @GetMapping("/loan")
    public ResponseDto<LoanDetailResponse> getLoanDetail(){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        LoanDetailResponse loanDetailResponse = null;

        return ResponseDto.success(SuccessCode.READ_SUCCESS, loanDetailResponse);
    }

    //대출 등록 009
    @PostMapping("/loan")
    public ResponseDto<Void> postLoan(@RequestBody LoanRequest loanRequest){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }

    //대출금 상환_내 대출 조회 010
    @GetMapping("/my-loan")
    public ResponseDto<MyLoanListRequest> getMyLoan(){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");

        MyLoanListRequest myLoanListRequest = null;
        return ResponseDto.success(SuccessCode.READ_SUCCESS, myLoanListRequest);
    }

    //대출금 상환_내 대출 상세 조회 010_1


    //대출금 상환 010_2
    @PatchMapping("/my-loan")
    public ResponseDto<Void> patchLoan(@RequestBody Map<String, Long> mapRequest){
        // Header에서 userId 얻기
        UUID userId = UUID.fromString("913418af-6b2e-11ef-929f-28c5d21eabf3");
        Long loanId = mapRequest.get("loanId");

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }
}
