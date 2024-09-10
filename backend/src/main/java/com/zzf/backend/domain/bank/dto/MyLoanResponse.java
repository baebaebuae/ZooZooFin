package com.zzf.backend.domain.bank.dto;

import lombok.Builder;

@Builder
public class MyLoanResponse {
    private Long loanId;
    private Long loanNumber;
    private Long loanRate;
    private Long payBackTurn;
    private Long loanPeriod;
    private Long loanAmount;
    private Long loanRemain;
    private Long loanType;
    private Boolean warning;
}
