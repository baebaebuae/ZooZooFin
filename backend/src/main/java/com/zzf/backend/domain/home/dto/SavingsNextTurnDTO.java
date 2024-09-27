package com.zzf.backend.domain.home.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SavingsNextTurnDTO {
    long warningSavingsCount;
    long savingsFinishTotal;
}
