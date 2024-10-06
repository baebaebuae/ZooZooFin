package com.zzf.backend.domain.loan.controller;

import com.zzf.backend.domain.loan.dto.*;
import com.zzf.backend.domain.loan.service.LoanService;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/loan")
public class LoanController {

    private final LoanService loanService;

    //대출 가능 조회 007
    @GetMapping("/check")
    public ResponseDto<LoanAvailableResponse> checkLoanAvailable(@AnimalId Long animalId) {

        LoanAvailableResponse loanAvailableResponse = loanService.checkLoanAvailable(animalId);

        return ResponseDto.success(READ_SUCCESS, loanAvailableResponse);
    }

//    //대출 조회 상세 008
//    @GetMapping
//    public ResponseDto<LoanDetailResponse> getLoanDetail(){
//        // Header에서 memberId 얻기
//        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";
//
//        LoanDetailResponse loanDetailResponse = null;
//
//        return ResponseDto.success(READ_SUCCESS, loanDetailResponse);
//    }

    //대출 등록 009
    @PostMapping
    public ResponseDto<Void> postLoan(@AnimalId Long animalId,
                                      @RequestBody LoanRequest loanRequest) {

        loanService.postLoan(animalId, loanRequest);

        return ResponseDto.success(CREATE_SUCCESS);
    }

    //대출금 상환_내 대출 조회 010
    @GetMapping("/my")
    public ResponseDto<MyLoanListResponse> getMyLoan(@AnimalId Long animalId) {

        MyLoanListResponse myLoanListResponse = loanService.getMyLoan(animalId);
        return ResponseDto.success(READ_SUCCESS, myLoanListResponse);
    }

//    //대출금 상환_내 대출 상세 조회 010_1
//    @GetMapping("/my/detail")
//    public ResponseDto<MyLoanResponse> getMyLoanDetail(@RequestBody Map<String, Long> mapRequest){
//        // Header에서 memberId 얻기
//        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";
//        Long loanId = mapRequest.get("loanId");
//
//        MyLoanResponse myLoanResponse = null;
//        return ResponseDto.success(READ_SUCCESS, myLoanResponse);
//    }

    //대출금 중도상환 010_2
    @PatchMapping("/my")
    public ResponseDto<Void> patchLoan(@AnimalId Long animalId,
                                       @RequestBody LoanDeleteRequest loanDeleteRequest) {
        Long loanId = loanDeleteRequest.getLoanId();

        loanService.patchLoan(animalId, loanId);
        return ResponseDto.success(UPDATE_SUCCESS);
    }
}
