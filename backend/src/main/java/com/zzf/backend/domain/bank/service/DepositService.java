package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.bank.dto.DepositRequest;
import com.zzf.backend.domain.bank.dto.DepositResponse;
import com.zzf.backend.domain.bank.dto.MyDepositResponse;

import java.util.List;

public interface DepositService {
    List<DepositResponse> getDeposit();

    void postDeposit(DepositRequest depositRequest, String memberId);

    List<MyDepositResponse> getMyDeposit(String memberId);

    void deleteMyDeposit(Long depositId);
}
