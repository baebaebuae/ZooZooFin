package com.zzf.backend.domain.deposit.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.deposit.dto.DepositRequest;
import com.zzf.backend.domain.deposit.dto.DepositTypeResponse;
import com.zzf.backend.domain.deposit.dto.MyDepositResponse;

import java.util.List;

public interface DepositService {
    List<DepositTypeResponse> getDeposit();

    void postDeposit(DepositRequest depositRequest, String memberId);

    List<MyDepositResponse> getMyDeposit(String memberId);

    void deleteMyDeposit(String memberId, Long depositId);

    void depositGoToNextTurn(Animal animal);

    void depositMature(Animal animal);
}
