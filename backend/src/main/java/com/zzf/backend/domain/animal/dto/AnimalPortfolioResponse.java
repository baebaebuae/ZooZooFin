package com.zzf.backend.domain.animal.dto;

public record AnimalPortfolioResponse(String animalName,
                                      Long animalAsset,
                                      Long animalCredit,
                                      Portfolio portfolio) {

    public record Portfolio(Long depositPercent,
                            Long savingsPercent,
                            Long stockPercent,
                            String investmentStyle,
                            String ending) {
    }
}
