package com.zzf.backend.domain.savings.service;

import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.dto.SavingsRequest;
import com.zzf.backend.domain.savings.dto.SavingsTypeResponse;

import java.util.List;

public interface SavingsService {
    List<SavingsTypeResponse> getSavings();

    void postSavings(SavingsRequest savingsRequest, String memberId);

    List<MySavingsResponse> getMySavings(String memberId);

    void deleteMySavings(String memberId, Long savingsId);

    void savingsMature(Long characterId);

    long getMyTotalSavings(Long characterId);
}
