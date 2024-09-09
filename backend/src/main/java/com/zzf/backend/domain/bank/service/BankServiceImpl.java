package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.bank.repository.*;
import com.zzf.backend.domain.bank.repository.SavingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BankServiceImpl implements BankService{
    private final DepositRepository depositRepository;
    private final SavingsRepository savingsRepository;
    private final LoanRepository loanRepository;
    private final CapitalRepository capitalRepository;

}
