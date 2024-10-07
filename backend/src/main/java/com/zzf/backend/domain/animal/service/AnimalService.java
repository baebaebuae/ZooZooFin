package com.zzf.backend.domain.animal.service;


import com.zzf.backend.domain.animal.dto.*;

import java.util.List;

public interface AnimalService {
    List<AnimalTypeResponse> getAnimalTypes();

    void createAnimal(String memberId, AnimalCreateRequest animalCreateRequest);

    AnimalPortfolioResponse getPortfolio(String memberId, Long animalId);

    AnimalInfoResponse getAnimalInfo(String memberId);

    AnimalQuestResponse getAnimalQuest(Long animalId);
}
