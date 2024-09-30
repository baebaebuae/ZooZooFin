package com.zzf.backend.domain.home.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NextTurnRecordResponse {
    private Long nextSavingsRepayment;
    private Long nextLoanRepayment;
    private Long nextCapitalRepayment;
}
