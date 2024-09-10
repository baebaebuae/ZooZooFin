package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.bank.repository.*;
import com.zzf.backend.domain.bank.repository.SavingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepositServiceImpl implements DepositService {
    private final DepositRepository depositRepository;



}
