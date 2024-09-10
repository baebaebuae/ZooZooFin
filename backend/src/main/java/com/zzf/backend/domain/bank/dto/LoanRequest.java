package com.zzf.backend.domain.bank.dto;

import lombok.Getter;

@Getter
public class LoanRequest {
    private Long loanType;
    private Long loanAmounts;
    private Long loanPeriod;
}
