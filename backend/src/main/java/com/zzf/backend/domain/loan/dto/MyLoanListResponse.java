package com.zzf.backend.domain.loan.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class MyLoanListResponse {
    private Long totalLoan;
    private Long restLoan;
    private List<MyLoanResponse> myLoanList;
}
