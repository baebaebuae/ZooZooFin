package com.zzf.backend.domain.home.controller;

import com.zzf.backend.domain.capital.dto.CapitalResponse;
import com.zzf.backend.domain.capital.service.CapitalService;
import com.zzf.backend.domain.deposit.dto.MyDepositResponse;
import com.zzf.backend.domain.deposit.service.DepositService;
import com.zzf.backend.domain.home.dto.*;
import com.zzf.backend.domain.home.service.HomeService;
import com.zzf.backend.domain.home.service.NextTurnService;
import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.service.SavingsService;
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
@Tag(name = "Home", description = "Home API, 다음 턴으로 넘어가기 관련 API")
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
    public ResponseDto<DepositSavingsResponse> getMyDepositSavings(@RequestHeader Long animalId){

        long totalMoney = homeService.getMyDepositSavings(animalId);
        List<MyDepositResponse> myDepositResponseList = depositService.getMyDeposit(animalId);
        List<MySavingsResponse> mySavingsResponseList = savingsService.getMySavings(animalId);

        return ResponseDto.success(READ_SUCCESS, DepositSavingsResponse.builder()
                .totalMoney(totalMoney)
                .myDepositResponseList(myDepositResponseList)
                .mySavingsResponseList(mySavingsResponseList)
                .build());
    }

    // 내 사채 조회 004
    @GetMapping("/capital")
    public ResponseDto<CapitalResponse> getMyCapital(@RequestHeader Long animalId){

        CapitalResponse capitalResponse = capitalService.getMyCapital(animalId);

        return ResponseDto.success(READ_SUCCESS, capitalResponse);
    }


    // 다음 턴으로 넘어가기 006
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "다음 턴으로 넘어가기 성공")
    })
    @Operation(summary = "다음 턴으로 넘어가기 기능", description = "예금, 적금, 대출, 사채를 다음 턴으로 넘어가게 해줌")
    @PatchMapping("/next")
    public ResponseDto<Void> patchNextTurn(@RequestHeader Long animalId){

        nextTurnService.nextTurn(animalId);

        return ResponseDto.success(UPDATE_SUCCESS);
    }

    // 오늘 거래 내역 007
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "오늘 거래 내역 조회 성공")
    })
    @Operation(summary = "오늘 거래 내역 확인하기 기능", description = "오늘 거래내역을 보여줌")
    @GetMapping("/turn-record")
    public ResponseDto<TurnRecordResponse> getTurnRecord(@RequestHeader Long animalId){

        TurnRecordResponse turnRecordResponse = nextTurnService.getTurnRecord(animalId);

        return ResponseDto.success(READ_SUCCESS, turnRecordResponse);
    }

    // 미납 고지서 008
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "미납 고지서 조회 성공")
    })
    @Operation(summary = "미납 고지서 확인하기 기능", description = "경고횟수, 압류 내역 등을 보여줌")
    @GetMapping("/warning-record")
    public ResponseDto<WarningRecordResponse> getWarningRecord(@RequestHeader Long animalId){

        WarningRecordResponse warningRecordResponse = nextTurnService.getWarningRecord(animalId);

        return ResponseDto.success(READ_SUCCESS, warningRecordResponse);
    }

    // 다음 턴 기록 009
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "다음 턴 기록 조회 성공")
    })
    @Operation(summary = "다음 턴 예상 지출 내역 확인하기 기능", description = "다음 턴의 예상 지출 내역을 보여줌")
    @GetMapping("/next-turn-record")
    public ResponseDto<NextTurnRecordResponse> getNextTurnRecord(@RequestHeader Long animalId){

        NextTurnRecordResponse nextTurnRecordResponse = nextTurnService.getNextTurnRecord(animalId);

        return ResponseDto.success(READ_SUCCESS, nextTurnRecordResponse);
    }

}
