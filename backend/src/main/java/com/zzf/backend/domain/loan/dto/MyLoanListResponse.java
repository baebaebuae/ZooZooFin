package com.zzf.backend.domain.loan.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class MyLoanListResponse {
    private Long totalLoan;
    private Long restLoan;
    private List<MyLoanResponse> myLoanList;
}
