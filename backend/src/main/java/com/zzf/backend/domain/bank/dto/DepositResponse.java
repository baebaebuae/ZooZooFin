package com.zzf.backend.domain.bank.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DepositResponse {
    private Long depositTypeId;
    private Long depositPeriod;
    private Long depositRate;
}
