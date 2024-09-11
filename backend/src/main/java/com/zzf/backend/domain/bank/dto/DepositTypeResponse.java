package com.zzf.backend.domain.bank.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DepositTypeResponse {
    private Long depositTypeId;
    private Long depositPeriod;
    private Long depositRate;
    private String depositName;
    private String depositImgUrl;
}
