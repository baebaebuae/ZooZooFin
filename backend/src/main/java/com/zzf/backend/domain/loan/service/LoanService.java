package com.zzf.backend.domain.loan.service;

import com.zzf.backend.domain.loan.dto.LoanAvailableResponse;
import com.zzf.backend.domain.loan.dto.LoanRequest;
import com.zzf.backend.domain.loan.dto.MyLoanListResponse;

public interface LoanService {
    LoanAvailableResponse checkLoanAvailable(Long animalId);

    void postLoan(Long animalId, LoanRequest loanRequest);

    MyLoanListResponse getMyLoan(Long animalId);

    void patchLoan(Long animalId, Long loanId);
}
