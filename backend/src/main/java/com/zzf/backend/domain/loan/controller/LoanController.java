package com.zzf.backend.domain.loan.controller;

import com.zzf.backend.domain.loan.dto.LoanDetailResponse;
import com.zzf.backend.domain.loan.dto.LoanRequest;
import com.zzf.backend.domain.loan.dto.MyLoanListResponse;
import com.zzf.backend.domain.loan.dto.MyLoanResponse;
import com.zzf.backend.domain.loan.service.LoanService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/loan")
public class LoanController {

    private final LoanService loanService;

    //대출 가능 조회 007
    @GetMapping("/check")
    public ResponseDto<Map<String, Boolean>> checkLoanAvailable(){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        Map<String, Boolean> response = new HashMap<>();

        return ResponseDto.success(SuccessCode.READ_SUCCESS, response);
    }

    //대출 조회 상세 008
    @GetMapping
    public ResponseDto<LoanDetailResponse> getLoanDetail(){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        LoanDetailResponse loanDetailResponse = null;

        return ResponseDto.success(SuccessCode.READ_SUCCESS, loanDetailResponse);
    }

    //대출 등록 009
    @PostMapping
    public ResponseDto<Void> postLoan(@RequestBody LoanRequest loanRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }

    //대출금 상환_내 대출 조회 010
    @GetMapping("/my")
    public ResponseDto<MyLoanListResponse> getMyLoan(){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        MyLoanListResponse myLoanListResponse = null;
        return ResponseDto.success(SuccessCode.READ_SUCCESS, myLoanListResponse);
    }

    //대출금 상환_내 대출 상세 조회 010_1
    @GetMapping("/my/detail")
    public ResponseDto<MyLoanResponse> getMyLoanDetail(@RequestBody Map<String, Long> mapRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";
        Long loanId = mapRequest.get("loanId");

        MyLoanResponse myLoanResponse = null;
        return ResponseDto.success(SuccessCode.READ_SUCCESS, myLoanResponse);
    }

    //대출금 상환 010_2
    @PatchMapping("/my")
    public ResponseDto<Void> patchLoan(@RequestBody Map<String, Long> mapRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";
        Long loanId = mapRequest.get("loanId");

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }
}
