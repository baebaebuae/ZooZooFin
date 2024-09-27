package com.zzf.backend.domain.home.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoanWarningDTO {
    private Long originalAssets;
    private Long warningLoanCount;
    private Long depositTotal;
    private Long depositRepay;
    private Long savingsTotal;
    private Long savingsRepay;
    private Long stockTotal;
    private Long stockRepay;

    public void increaseWarningLoanCount(){
        this.warningLoanCount++;
    }
}
