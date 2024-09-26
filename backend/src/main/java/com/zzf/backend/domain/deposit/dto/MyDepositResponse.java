package com.zzf.backend.domain.deposit.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyDepositResponse {
    private Long depositId;
    private String name;
    private Long period;
    private Long amount;
    private Long rate;
    private Long finalReturn;
    private Long restTurn;
    private Long endTurn;
    private String depositImgUrl;
}
