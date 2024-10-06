package com.zzf.backend.domain.stock.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuyStockRequest {

    private Long stockId;

    private Long count;

}
