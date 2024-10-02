package com.zzf.backend.domain.work.controller;

import com.zzf.backend.domain.work.dto.WorkRequest;
import com.zzf.backend.domain.work.service.WorkService;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/work")
public class WorkController {

    private final WorkService workService;

    @PatchMapping
    public ResponseDto<?> doWork(@AnimalId Long animalId,
                                 @RequestBody WorkRequest workRequest) {
        workService.doWork(animalId, workRequest);

        return ResponseDto.success(WORK_SUCCESS);
    }
}
