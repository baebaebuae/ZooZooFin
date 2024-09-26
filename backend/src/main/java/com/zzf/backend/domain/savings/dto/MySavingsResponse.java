package com.zzf.backend.domain.savings.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MySavingsResponse {
    private Long savingsId;
    private String name;
    private Long period;
    private Long amount;
    private Long rate;
    private Long payment;
    private Long finalReturn;
    private Long restTurn;
    private Long endTurn;
    private Boolean warning;
    private String savingsImgUrl;
}
