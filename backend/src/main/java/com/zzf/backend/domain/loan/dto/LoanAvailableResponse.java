package com.zzf.backend.domain.loan.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoanAvailableResponse {
    private Long characterCredit;
    private Boolean isAvailable;
    private Long loanRate;
    private Long loanLimit;
    private Long loanAvailable;
}
