package com.zzf.backend.domain.deposit.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepositRequest {
    private Long typeId;
    private Long money;
}
