package com.zzf.backend.domain.bank.dto;

import lombok.Getter;

@Getter
public class DepositRequest {
    private Long depositTypeId;
    private Long depositAmount;
}
