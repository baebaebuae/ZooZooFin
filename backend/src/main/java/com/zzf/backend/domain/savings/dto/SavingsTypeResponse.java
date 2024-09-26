package com.zzf.backend.domain.savings.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SavingsTypeResponse {
    private Long typeId;
    private Long period;
    private Long rate;
    private String name;
    private String imgUrl;
}
