package com.zzf.backend.domain.capital.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.capital.dto.CapitalRequest;
import com.zzf.backend.domain.capital.entity.Capital;
import com.zzf.backend.domain.capital.repository.CapitalRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class CapitalServiceImpl implements CapitalService{

    private final AnimalRepository animalRepository;
    private final CapitalRepository capitalRepository;

    @Override
    public Boolean getCapitalExist(Long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        return capitalRepository.existsByAnimalAndCapitalIsEndFalse(animal);
    }

    @Override
    public void postCapital(Long animalId, CapitalRequest capitalRequest) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (capitalRepository.existsByAnimalAndCapitalIsEndFalse(animal)){
            throw new CustomException(CAPITAL_DUPLICATE_NOT_ALLOWED_EXCEPTION);
        }

        Capital capital = Capital.builder()
                .capitalAmount(capitalRequest.getCapitalAmounts())
                .capitalRemain(capitalRequest.getCapitalAmounts())
                .capitalStartTurn(animal.getAnimalTurn())
                .capitalEndTurn(animal.getAnimalTurn() + capitalRequest.getCapitalPeriod())
                .capitalIsEnd(false)
                .build();

        capitalRepository.save(capital);

        // 캐릭터 가용 자산 증가. 선이자 제외.
        animal.increaseAnimalAssets(capitalRequest.getCapitalAmounts() * 9 / 10);
    }

    @Override
    public void patchCapital(Long animalId, Long money) {

    }
}
