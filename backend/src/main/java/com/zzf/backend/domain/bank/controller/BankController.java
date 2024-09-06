package com.zzf.backend.domain.bank.controller;

import com.zzf.backend.domain.bank.dto.DepositResponse;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/bank")
public class BankController {

    //예금 조회 001
    @PostMapping("/deposit")
    public ResponseDto<List<DepositResponse>> getDeposit(){

        List<DepositResponse> depositResponseList = null;
        return ResponseDto.success(SuccessCode.OK, depositResponseList);
    }
}
