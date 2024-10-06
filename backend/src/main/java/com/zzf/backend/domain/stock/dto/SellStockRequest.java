package com.zzf.backend.domain.stock.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellStockRequest {

    private Long stockId;

    private Long count;

}
