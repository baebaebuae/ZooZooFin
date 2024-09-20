package com.zzf.backend.domain.savings.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.dto.SavingsRequest;
import com.zzf.backend.domain.savings.dto.SavingsTypeResponse;
import com.zzf.backend.domain.savings.entity.Savings;

import java.util.List;

public interface SavingsService {
    List<SavingsTypeResponse> getSavings();

    void postSavings(SavingsRequest savingsRequest, String memberId);

    List<MySavingsResponse> getMySavings(String memberId);

    void deleteMySavings(String memberId, Long savingsId);

    void savingsGoToNextTurn(Animal animal);

    void savingsMature(Savings savings, Animal animal);
}
