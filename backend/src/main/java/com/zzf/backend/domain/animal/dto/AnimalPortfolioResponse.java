package com.zzf.backend.domain.animal.dto;

import lombok.Builder;

@Builder
public record AnimalPortfolioResponse(String animalName,
                                      String animalHierarchy,
                                      String animalAbility,
                                      Long animalCredit,
                                      Long totalAmount,
                                      Long totalAssets,
                                      Long totalDeposit,
                                      Long totalSavings,
                                      Long totalStock,
                                      Long totalLoan,
                                      Portfolio portfolio) {

    @Builder
    public record Portfolio(Double depositPercent,
                            Double savingsPercent,
                            Double stockPercent,
                            String investmentStyle,
                            String ending,
                            Long totalFundsPercent) {
    }
}
