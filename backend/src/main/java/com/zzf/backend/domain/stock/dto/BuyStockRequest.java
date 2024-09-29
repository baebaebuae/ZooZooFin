package com.zzf.backend.domain.stock.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class BuyStockRequest {

    private final Long stockId;

    private final Long count;

}
