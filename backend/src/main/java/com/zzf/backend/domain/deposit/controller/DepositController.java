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

import static com.zzf.backend.global.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/deposit")
public class DepositController {

    private final DepositService depositService;

    //예금 조회 001
    @GetMapping
    public ResponseDto<List<DepositTypeResponse>> getDeposit(){

        List<DepositTypeResponse> depositTypeResponseList = depositService.getDeposit();

        return ResponseDto.success(READ_SUCCESS, depositTypeResponseList);
    }

    //예금 등록 002
    @PostMapping
    public ResponseDto<Void> postDeposit(@RequestHeader Long animalId,
                                         @RequestBody DepositRequest depositRequest){
        depositService.postDeposit(animalId, depositRequest);

        return ResponseDto.success(CREATE_SUCCESS);
    }

    //예금 해지_내 예금 조회 003
    @GetMapping("/my")
    public ResponseDto<List<MyDepositResponse>> getMyDeposit(@RequestHeader Long animalId){
        List<MyDepositResponse> myDepositResponseList = depositService.getMyDeposit(animalId);

        return ResponseDto.success(READ_SUCCESS, myDepositResponseList);
    }

    //예금 해지 003_1
    @PatchMapping("/my")
    public ResponseDto<Void> deleteMyDeposit(@RequestHeader Long animalId,
                                             @RequestBody Map<String, Long> mapRequest){
        Long depositId = mapRequest.get("depositId");

        depositService.deleteMyDeposit(animalId, depositId);

        return ResponseDto.success(UPDATE_SUCCESS);
    }
}
