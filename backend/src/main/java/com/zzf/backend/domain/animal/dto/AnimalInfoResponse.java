package com.zzf.backend.domain.animal.dto;

import lombok.Builder;

@Builder
public record AnimalInfoResponse(String animalName,
                                 Long animalAbility,
                                 String animalHierarchy,
                                 Long animalCredit,
                                 Boolean isWorkToday,
                                 Boolean isSolvedQuizToday,
                                 Long totalAmount,
                                 Long totalAssets,
                                 Long totalDeposit,
                                 Long totalSavings,
                                 Double totalStock,
                                 Long totalLoan,
                                 Long totalCapital) {
}
