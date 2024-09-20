package com.zzf.backend.domain.loan.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.loan.dto.LoanAvailableResponse;
import com.zzf.backend.domain.loan.dto.LoanRequest;
import com.zzf.backend.domain.loan.dto.MyLoanListResponse;

public interface LoanService {
    LoanAvailableResponse checkLoanAvailable(String memberId);

    void postLoan(LoanRequest loanRequest, String memberId);

    MyLoanListResponse getMyLoan(String memberId);

    void patchLoan(Long loanId, String memberId);

    void loanGoToNextTurn(Animal animal);

    long getMyTotalLoans(Animal animal);
}
