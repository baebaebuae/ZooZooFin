package com.zzf.backend.domain.animal.controller;

import com.zzf.backend.domain.animal.dto.AnimalCreateRequest;
import com.zzf.backend.domain.animal.dto.AnimalInfoResponse;
import com.zzf.backend.domain.animal.dto.AnimalPortfolioResponse;
import com.zzf.backend.domain.animal.dto.AnimalTypeResponse;
import com.zzf.backend.domain.animal.service.AnimalService;
import com.zzf.backend.global.auth.annotation.MemberId;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.zzf.backend.global.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/animal")
public class AnimalController {

    private final AnimalService animalService;

    @GetMapping
    public ResponseDto<List<AnimalTypeResponse>> getAnimalTypes() {
        List<AnimalTypeResponse> animalTypes = animalService.getAnimalTypes();

        return ResponseDto.success(ANIMAL_TYPES_SUCCESS, animalTypes);
    }

    @PostMapping
    public ResponseDto<?> createAnimal(@MemberId String memberId,
                                       @RequestBody AnimalCreateRequest animalCreateRequest) {
        animalService.createAnimal(memberId, animalCreateRequest);

        return ResponseDto.success(ANIMAL_CREATE_SUCCESS);
    }

    @GetMapping("/{animalId}")
    public ResponseDto<AnimalPortfolioResponse> getPortfolio(@MemberId String memberId,
                                                             @PathVariable Long animalId) {
        AnimalPortfolioResponse portfolio = animalService.getPortfolio(memberId, animalId);

        return ResponseDto.success(PORTFOLIO_SUCCESS, portfolio);
    }

    @GetMapping("/info")
    public ResponseDto<AnimalInfoResponse> getAnimalInfo(@MemberId String memberId) {
        AnimalInfoResponse animalInfo = animalService.getAnimalInfo(memberId);

        return ResponseDto.success(ANIMAL_INFO_SUCCESS, animalInfo);
    }
}

