package com.zzf.backend.domain.stock.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record StockListResponse(Long exchange,
                                Double exchangeRate,
                                List<StockDetails> stockDetails) {

    @Builder
    public record StockDetails(Long stockId,
                               String stockName,
                               String stockField,
                               String stockIntro,
                               String stockImage,
                               Double rate,
                               Long price) {
    }
}
