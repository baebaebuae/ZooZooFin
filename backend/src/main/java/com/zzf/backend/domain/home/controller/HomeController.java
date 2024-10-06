package com.zzf.backend.domain.home.controller;

import com.zzf.backend.domain.capital.dto.CapitalResponse;
import com.zzf.backend.domain.capital.service.CapitalService;
import com.zzf.backend.domain.deposit.dto.MyDepositResponse;
import com.zzf.backend.domain.deposit.service.DepositService;
import com.zzf.backend.domain.home.dto.*;
import com.zzf.backend.domain.home.service.HomeService;
import com.zzf.backend.domain.home.dto.NextTurnRecordResponse;
import com.zzf.backend.domain.home.dto.TurnRecordResponse;
import com.zzf.backend.domain.home.dto.WarningRecordResponse;
import com.zzf.backend.domain.home.service.NextTurnService;
import com.zzf.backend.domain.savings.dto.MySavingsResponse;
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
@RequestMapping("/api/v1/home")
public class HomeController {

    private final NextTurnService nextTurnService;
    private final HomeService homeService;
    private final DepositService depositService;
    private final SavingsService savingsService;
    private final CapitalService capitalService;

    // 내 예적금 조회 001
    @GetMapping("/my-deposit-savings")
    public ResponseDto<DepositSavingsResponse> getMyDepositSavings(@AnimalId Long animalId){

        long totalMoney = homeService.getMyDepositSavings(animalId);
        List<MyDepositResponse> myDepositResponseList = depositService.getMyDeposit(animalId);
        List<MySavingsResponse> mySavingsResponseList = savingsService.getMySavings(animalId);

        return ResponseDto.success(READ_SUCCESS, DepositSavingsResponse.builder()
                .totalMoney(totalMoney)
                .myDepositResponseList(myDepositResponseList)
                .mySavingsResponseList(mySavingsResponseList)
                .build());
    }

    // 다음 턴으로 넘어가기
    // 내 사채 조회 004
    @GetMapping("/capital")
    public ResponseDto<CapitalResponse> getMyCapital(@AnimalId Long animalId){

        CapitalResponse capitalResponse = capitalService.getMyCapital(animalId);

        return ResponseDto.success(READ_SUCCESS, capitalResponse);
    }


    // 다음 턴으로 넘어가기 006
    @PatchMapping("/next")
    public ResponseDto<Void> patchNextTurn(@AnimalId Long animalId){

        nextTurnService.nextTurn(animalId);

        return ResponseDto.success(UPDATE_SUCCESS);
    }

    // 오늘 거래 내역
    @GetMapping("/turn-record")
    public ResponseDto<TurnRecordResponse> getTurnRecord(@AnimalId Long animalId){

        TurnRecordResponse turnRecordResponse = nextTurnService.getTurnRecord(animalId);

        return ResponseDto.success(READ_SUCCESS, turnRecordResponse);
    }

    // 미납 고지서
    @GetMapping("/warning-record")
    public ResponseDto<WarningRecordResponse> getWarningRecord(@AnimalId Long animalId){

        WarningRecordResponse warningRecordResponse = nextTurnService.getWarningRecord(animalId);

        return ResponseDto.success(READ_SUCCESS, warningRecordResponse);
    }

    // 다음 턴 기록
    @GetMapping("/next-turn-record")
    public ResponseDto<NextTurnRecordResponse> getNextTurnRecord(@AnimalId Long animalId){

        NextTurnRecordResponse nextTurnRecordResponse = nextTurnService.getNextTurnRecord(animalId);

        return ResponseDto.success(READ_SUCCESS, nextTurnRecordResponse);
    }

}
