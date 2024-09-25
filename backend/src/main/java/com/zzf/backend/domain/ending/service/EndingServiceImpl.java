package com.zzf.backend.domain.ending.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.ending.dto.EndingRequest;
import com.zzf.backend.domain.ending.status.EndingStatus;
import com.zzf.backend.domain.portfolio.entity.Portfolio;
import com.zzf.backend.domain.portfolio.repository.PortfolioRepository;
import com.zzf.backend.global.exception.CustomException;
import com.zzf.backend.global.status.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class EndingServiceImpl implements EndingService {

    private final AnimalRepository animalRepository;
    private final PortfolioRepository portfolioRepository;

    @Override
    public void createEnding(Long animalId, EndingRequest endingRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        EndingStatus endingStatus = EndingStatus.getEndingStatus(endingRequest.endingType());

        portfolioRepository.save(Portfolio.builder()
                .animal(animal)
                .portfolioEnding(endingStatus.getEndingCode())
                .portfolioDepositPercent(0L)
                .portfolioSavingsPercent(0L)
                .portfolioStockPercent(0L)
                .portfolioInvestStyle("test")
                .portfolioScore(0L)
                .build());
    }
}
