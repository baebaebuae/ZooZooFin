package com.zzf.backend.domain.savings.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.dto.SavingsRequest;
import com.zzf.backend.domain.savings.dto.SavingsTypeResponse;
import com.zzf.backend.domain.savings.entity.Savings;

import java.util.List;

public interface SavingsService {
    List<SavingsTypeResponse> getSavings();

    void postSavings(Long animalId, SavingsRequest savingsRequest);

    List<MySavingsResponse> getMySavings(String memberId);

    void deleteMySavings(Long animalId, Long savingsId);
}
