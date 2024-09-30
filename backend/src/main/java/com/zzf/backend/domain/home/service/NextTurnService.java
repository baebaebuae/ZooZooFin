package com.zzf.backend.domain.home.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.home.dto.*;
import com.zzf.backend.domain.savings.entity.Savings;

public interface NextTurnService {

    /**
     * <h1>다음날로 넘어가기</h1>
     */
    void nextTurn(long animalId);

    TurnRecordResponse getTurnRecord(long animalId);

    WarningRecordResponse getWarningRecord(long animalId);

    NextTurnRecordResponse getNextTurnRecord(long animalId);

    long depositGoToNextTurn(Animal animal);

    long depositMature(Animal animal);

    SavingsNextTurnDTO savingsGoToNextTurn(Animal animal);

    long savingsMature(Savings savings, Animal animal);

    long savingsExpect(Animal animal);

    /**
     * <h3>대출 다음날로 넘어가기</h3>
     *
     * @param animal 플레이어블 캐릭터
     * @return LoanWarningDTO
     */
    LoanWarningDTO loanGoToNextTurn(Animal animal);

    void deleteAllDeposit(Animal animal, LoanWarningDTO loanWarningDTO);

    void deleteAllSavings(Animal animal, LoanWarningDTO loanWarningDTO);

    void deleteAllStock(Animal animal, LoanWarningDTO loanWarningDTO);

    long loanExpect(Animal animal);

    /**
     * <h3>사채 다음날로 넘어가기</h3>
     *
     * @param animal 플레이어블 캐릭터
     */
    long capitalGoToNextTurn(Animal animal);

    long capitalExpect(Animal animal);
}
