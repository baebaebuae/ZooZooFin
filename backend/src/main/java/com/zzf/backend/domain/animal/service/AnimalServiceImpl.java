package com.zzf.backend.domain.animal.service;

import com.zzf.backend.domain.animal.dto.AnimalCreateRequest;
import com.zzf.backend.domain.animal.dto.AnimalPortfolioResponse;
import com.zzf.backend.domain.animal.dto.AnimalTypeResponse;
import com.zzf.backend.domain.animal.entity.AnimalType;
import com.zzf.backend.domain.animal.repository.AnimalTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

    private final AnimalTypeRepository animalTypeRepository;

    @Override
    public List<AnimalTypeResponse> getAnimalTypes() {
        List<AnimalType> animalTypeList = animalTypeRepository.findAll();

        return animalTypeList.stream().map(animalType ->
                        new AnimalTypeResponse(
                                animalType.getAnimalTypeId(),
                                animalType.getAnimalTypeName(),
                                animalType.getAnimalAbility()))
                .collect(Collectors.toList());
    }

//    @Override
//    public void createAnimal(String memberId, AnimalCreateRequest animalCreateRequest) {
//    }
//
//    @Override
//    public AnimalPortfolioResponse getPortfolio(String memberId, String animalId) {
//        return null;
//    }
}
