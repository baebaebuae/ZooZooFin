package com.zzf.backend.domain.home.DTO;

import com.zzf.backend.domain.loan.entity.Loan;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoanRepayDTO {
    private Loan loan;
    private Long loanRepay;
}
