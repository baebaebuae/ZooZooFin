package com.zzf.backend.domain.savings.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SavingsTypeResponse {
    private Long savingsTypeId;
    private Long savingsPeriod;
    private Long savingsRate;
    private String savingsName;
    private String SavingsImgUrl;
}
