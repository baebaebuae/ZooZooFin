package com.zzf.backend.domain.stock.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record GetHoldingsResponse(Long totalAmount,
                                  Double totalInvestment,
                                  Double totalProfit,
                                  List<Holdings> holdingsList) {

    @Builder
    public record Holdings(Long stockId,
                           String stockField,
                           String stockName,
                           Double stockRate,
                           Long stockTotal,
                           Long stockPrice,
                           Long stockCount) {
    }
}
