package com.zzf.backend.domain.animal.dto;

import lombok.Builder;

@Builder
public record AnimalInfoResponse(String animalName,
                                 Long animalAbility,
                                 Long animalHierarchy,
                                 Long animalCredit,
                                 Boolean isSolveQuizToday,
                                 Boolean isWorkToday,
                                 Long totalAmount,
                                 Long totalAssets,
                                 Long totalDeposit,
                                 Long totalSavings,
                                 Long totalStock,
                                 Long totalLoan,
                                 Long totalCapital) {
}
