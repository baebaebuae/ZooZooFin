package com.zzf.backend.domain.deposit.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepositRequest {
    private Long depositTypeId;
    private Long depositAmount;
}
