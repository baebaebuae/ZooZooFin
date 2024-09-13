package com.zzf.backend.domain.loan.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoanDetailResponse {
    private Long characterCredit;
    private Long loanRate;
    private Long loanLimit;
    private Long loanAvailable;
}
