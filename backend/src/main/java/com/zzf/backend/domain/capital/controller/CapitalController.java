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
    public ResponseDto<Map<String, Boolean>> getCapital(@RequestHeader Long animalId){

        Map<String, Boolean> mapResponse = new HashMap<>();
        mapResponse.put("capitalExist", capitalService.getCapitalExist(animalId));

        return ResponseDto.success(SuccessCode.READ_SUCCESS, mapResponse);
    }

    //사채 등록 013
    @PostMapping
    public ResponseDto<Void> postCapital(@RequestHeader Long animalId, @RequestBody CapitalRequest capitalRequest){

        capitalService.postCapital(animalId, capitalRequest);

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }

    //사채 상환 014
    @PatchMapping
    public ResponseDto<Void> patchCapital(@RequestHeader Long animalId, @RequestBody Map<String, Long> mapRequest){

        Long money = mapRequest.get("money");

        capitalService.patchCapital(animalId, money);

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }
}
