package com.zzf.backend.domain.capital.controller;

import com.zzf.backend.domain.capital.dto.CapitalRepayRequest;
import com.zzf.backend.domain.capital.dto.CapitalRequest;
import com.zzf.backend.domain.capital.service.CapitalService;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/capital")
public class CapitalController {

    private final CapitalService capitalService;

    //사채 있는지 확인 012
    @GetMapping
    public ResponseDto<Map<String, Boolean>> getCapital(@AnimalId Long animalId){

        Map<String, Boolean> mapResponse = new HashMap<>();
        mapResponse.put("capitalExist", capitalService.getCapitalExist(animalId));

        return ResponseDto.success(READ_SUCCESS, mapResponse);
    }

    //사채 등록 013
    @PostMapping
    public ResponseDto<Void> postCapital(@AnimalId Long animalId,
                                         @RequestBody CapitalRequest capitalRequest){

        capitalService.postCapital(animalId, capitalRequest);

        return ResponseDto.success(CREATE_SUCCESS);
    }

    //사채 상환 014
    @PatchMapping
    public ResponseDto<Void> patchCapital(@AnimalId Long animalId,
                                          @RequestBody CapitalRepayRequest capitalRepayRequest){

        Long money = capitalRepayRequest.getMoney();

        capitalService.patchCapital(animalId, money);

        return ResponseDto.success(UPDATE_SUCCESS);
    }
}
