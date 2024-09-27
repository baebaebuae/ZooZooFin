package com.zzf.backend.domain.deposit.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepositRequest {
    private Long typeId;
    private Long money;
}
