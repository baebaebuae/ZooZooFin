package com.zzf.backend.domain.capital.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CapitalResponse {
    private Long capitalOrigin;
    private Long capitalEndTurn;
    private Long capitalRestTurn;
    private Long capitalRestMoney;
}
