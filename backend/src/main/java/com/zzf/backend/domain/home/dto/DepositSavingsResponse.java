package com.zzf.backend.domain.home.dto;

import com.zzf.backend.domain.deposit.dto.MyDepositResponse;
import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class DepositSavingsResponse {
    private Long totalMoney;
    private List<MyDepositResponse> myDepositResponseList;
    private List<MySavingsResponse> mySavingsResponseList;
}
