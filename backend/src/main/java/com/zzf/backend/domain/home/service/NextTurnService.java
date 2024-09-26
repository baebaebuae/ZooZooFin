package com.zzf.backend.domain.home.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.home.DTO.LoanWarningDTO;
import com.zzf.backend.domain.savings.entity.Savings;
import org.springframework.transaction.annotation.Transactional;

public interface NextTurnService {

    void depositGoToNextTurn(Animal animal);

    void depositMature(Animal animal);

    long savingsGoToNextTurn(Animal animal);

    void savingsMature(Savings savings, Animal animal);

    LoanWarningDTO loanGoToNextTurn(Animal animal);

    void deleteAllDeposit(Animal animal, LoanWarningDTO loanWarningDTO);

    void deleteAllSavings(Animal animal, LoanWarningDTO loanWarningDTO);

    void deleteAllStock(Animal animal, LoanWarningDTO loanWarningDTO);

    boolean capitalGoToNextTurn(Animal animal);
}
