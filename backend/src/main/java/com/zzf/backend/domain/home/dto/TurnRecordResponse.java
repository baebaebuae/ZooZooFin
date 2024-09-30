package com.zzf.backend.domain.home.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TurnRecordResponse {
    private Long dailyCharge;
    private Long loanMake;
    private Long loanRepay;
    private Long stockBuy;
    private Long stockSell;
    private Long depositMake;
    private Long depositFinish;
    private Long savingsMake;
    private Long savingsPay;
    private Long savingsFinish;
    private Long capitalMake;
    private Long capitalRepay;
}
