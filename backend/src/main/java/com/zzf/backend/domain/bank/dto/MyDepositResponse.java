package com.zzf.backend.domain.bank.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyDepositResponse {
    private Long depositId;
    private String name;
    private Long period;
    private Long amount;
    private Long finalReturn;
    private Long restTurn;
    private Long endTurn;
}
