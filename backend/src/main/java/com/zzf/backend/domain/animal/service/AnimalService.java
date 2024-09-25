package com.zzf.backend.domain.animal.service;


import com.zzf.backend.domain.animal.dto.AnimalCreateRequest;
import com.zzf.backend.domain.animal.dto.AnimalInfoResponse;
import com.zzf.backend.domain.animal.dto.AnimalPortfolioResponse;
import com.zzf.backend.domain.animal.dto.AnimalTypeResponse;

import java.util.List;

public interface AnimalService {
    List<AnimalTypeResponse> getAnimalTypes();

    /**
     * <h1>동물 만들기</h1>
     * dfkjsdkfjsdf
     * @param memberId
     * @param animalCreateRequest
     */
    void createAnimal(String memberId, AnimalCreateRequest animalCreateRequest);

    AnimalPortfolioResponse getPortfolio(String memberId, Long animalId);

    AnimalInfoResponse getAnimalInfo(String memberId);
}
