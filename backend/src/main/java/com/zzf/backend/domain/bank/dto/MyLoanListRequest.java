package com.zzf.backend.domain.bank.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MyLoanListRequest {
    private Long totalLoan;
    private Long restLoan;
    private List<MyLoanRequest> myLoanList;
}
