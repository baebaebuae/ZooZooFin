package com.zzf.backend.domain.animal.service;


import com.zzf.backend.domain.animal.dto.AnimalCreateRequest;
import com.zzf.backend.domain.animal.dto.AnimalPortfolioResponse;
import com.zzf.backend.domain.animal.dto.AnimalTypeResponse;

import java.util.List;

public interface AnimalService {
    List<AnimalTypeResponse> getAnimalTypes();

//    void createAnimal(String memberId, AnimalCreateRequest animalCreateRequest);
//
//    AnimalPortfolioResponse getPortfolio(String memberId, String animalId);
}
