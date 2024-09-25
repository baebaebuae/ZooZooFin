package com.zzf.backend.domain.ending.service;

import com.zzf.backend.domain.ending.dto.EndingRequest;

public interface EndingService {
    void createEnding(Long animalId, EndingRequest endingRequest);
}
