package com.zzf.backend.domain.capital.controller;

import com.zzf.backend.domain.capital.dto.CapitalRequest;
import com.zzf.backend.domain.capital.service.CapitalService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/capital")
public class CapitalController {

    private final CapitalService capitalService;

    //사채 있는지 확인 012
    @GetMapping
    public ResponseDto<Map<String, Boolean>> getCapital(){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        Map<String, Boolean> mapResponse = new HashMap<>();

        return ResponseDto.success(SuccessCode.READ_SUCCESS, mapResponse);
    }

    //사채 등록 013
    @PostMapping
    public ResponseDto<Void> postCapital(@RequestBody CapitalRequest capitalRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }

    //사채 상환 014
    @PatchMapping
    public ResponseDto<Void> patchCapital(@RequestBody Map<String, Long> mapRequest){
        // Header에서 memberId 얻기
        String memberId = "913418af-6b2e-11ef-929f-28c5d21eabf3";
        Long money = mapRequest.get("money");

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }
}
