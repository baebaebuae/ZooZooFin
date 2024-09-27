package com.zzf.backend.domain.home.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SavingsNextTurnDTO {
    long warningSavingsCount; // 경고받은 적금 수
    long savingsFinishTotal; // 만기, 해지한 적금 총액
}
