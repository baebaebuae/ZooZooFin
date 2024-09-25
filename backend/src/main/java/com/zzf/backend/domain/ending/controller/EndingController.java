package com.zzf.backend.domain.ending.controller;

import com.zzf.backend.domain.ending.dto.EndingRequest;
import com.zzf.backend.domain.ending.service.EndingService;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ending")
public class EndingController {

    private final EndingService endingService;

    @PostMapping
    public ResponseDto<?> createEnding(@RequestHeader Long animalId,
                                       @RequestBody EndingRequest endingRequest) {
        endingService.createEnding(animalId, endingRequest);

        return ResponseDto.success(ENDING_SUCCESS);
    }
}
