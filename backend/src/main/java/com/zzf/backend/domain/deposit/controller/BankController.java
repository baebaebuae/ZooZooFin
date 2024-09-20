package com.zzf.backend.domain.deposit.controller;

import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/bank")
public class BankController {

    //파산 신청 011
    @PatchMapping("/bankrupt")
    public ResponseDto<Void> gameover(){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }
}