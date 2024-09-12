package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.bank.dto.DepositRequest;
import com.zzf.backend.domain.bank.dto.DepositTypeResponse;
import com.zzf.backend.domain.bank.dto.MyDepositResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DepositService {
    List<DepositTypeResponse> getDeposit();

    void postDeposit(DepositRequest depositRequest, String memberId);

    List<MyDepositResponse> getMyDeposit(String memberId);

    void deleteMyDeposit(String memberId, Long depositId);

    void depositMature(Long characterId);

    long getMyTotalDeposit(Long characterId);
}
