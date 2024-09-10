package com.zzf.backend.domain.bank.dto;

import lombok.Getter;

@Getter
public class SavingsResponse {
    private Long savingsTypeId;
    private Long savingsPeriod;
    private Long savingsRate;
}
