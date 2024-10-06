package com.zzf.backend.domain.home.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WarningRecordResponse {
    private Long warningSavingsCount;
    private Long warningLoanCount;

    private Long depositTotal;
    private Long depositRepay;

    private Long savingsTotal;
    private Long savingsRepay;

    private Long stockTotal;
    private Long stockRepay;
}
