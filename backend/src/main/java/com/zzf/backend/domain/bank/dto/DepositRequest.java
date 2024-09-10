package com.zzf.backend.domain.bank.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepositRequest {
    private Long depositTypeId;
    private Long depositAmount;
}
