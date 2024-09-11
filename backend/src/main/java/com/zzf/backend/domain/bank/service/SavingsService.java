package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.bank.dto.MySavingsResponse;
import com.zzf.backend.domain.bank.dto.SavingsRequest;
import com.zzf.backend.domain.bank.dto.SavingsTypeResponse;

import java.util.List;

public interface SavingsService {
    List<SavingsTypeResponse> getSavings();

    void postSavings(SavingsRequest savingsRequest, String memberId);

    List<MySavingsResponse> getMySavings(String memberId);

    void deleteMySavings(String memberId, Long savingsId);
}
