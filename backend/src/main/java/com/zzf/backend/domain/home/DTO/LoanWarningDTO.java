package com.zzf.backend.domain.home.DTO;

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
    private Boolean gameOver;

    public void increaseWarningLoanCount(){
        this.warningLoanCount++;
    }
}
