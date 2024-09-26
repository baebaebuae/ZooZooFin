package com.zzf.backend.domain.animal.dto;

import lombok.Builder;

@Builder
public record AnimalPortfolioResponse(String animalName,
                                      Long animalAsset,
                                      Long animalCredit,
                                      Portfolio portfolio) {

    @Builder
    public record Portfolio(Double depositPercent,
                            Double savingsPercent,
                            Double stockPercent,
                            String investmentStyle,
                            String ending) {
    }
}
