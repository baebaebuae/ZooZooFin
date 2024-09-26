package com.zzf.backend.domain.deposit.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DepositTypeResponse {
    private Long typeId;
    private Long period;
    private Long rate;
    private String name;
    private String imgUrl;
}
