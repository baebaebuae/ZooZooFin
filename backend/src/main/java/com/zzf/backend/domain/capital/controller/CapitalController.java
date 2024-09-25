package com.zzf.backend.domain.capital.controller;

import com.zzf.backend.domain.capital.dto.CapitalRepayRequest;
import com.zzf.backend.domain.capital.dto.CapitalRequest;
import com.zzf.backend.domain.capital.service.CapitalService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Tag(name = "Capital", description = "Capital API, 사채 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/capital")
public class CapitalController {

    private final CapitalService capitalService;

    //사채 있는지 확인 012
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사채 가능 여부 조회 성공")
    })
    @Operation(summary = "사채 가능 여부 조회", description = "사용자가 사채 사용이 가능한지 여부를 보여줌.")
    @GetMapping
    public ResponseDto<Map<String, Boolean>> getCapital(@RequestHeader Long animalId){

        Map<String, Boolean> mapResponse = new HashMap<>();
        mapResponse.put("capitalExist", capitalService.getCapitalExist(animalId));

        return ResponseDto.success(SuccessCode.READ_SUCCESS, mapResponse);
    }

    //사채 등록 013
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사채 등록 성공")
    })
    @Operation(summary = "사채 등록", description = "사채를 등록함.")
    @PostMapping
    public ResponseDto<Void> postCapital(@RequestHeader Long animalId,
                                         @RequestBody CapitalRequest capitalRequest){

        capitalService.postCapital(animalId, capitalRequest);

        return ResponseDto.success(SuccessCode.CREATE_SUCCESS);
    }

    //사채 상환 014
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사채 상환 성공")
    })
    @Operation(summary = "사채 상환", description = "사채를 상환함. 중도상환 가능, 전액 상환만 가능, 일부 상환 불가능")
    @PatchMapping
    public ResponseDto<Void> patchCapital(@RequestHeader Long animalId,
                                          @RequestBody CapitalRepayRequest capitalRepayRequest){

        Long money = capitalRepayRequest.getMoney();

        capitalService.patchCapital(animalId, money);

        return ResponseDto.success(SuccessCode.UPDATE_SUCCESS);
    }
}
