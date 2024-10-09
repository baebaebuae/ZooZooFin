package com.zzf.backend.domain.stock.dto;

import com.zzf.backend.domain.stock.entity.Chart;
import lombok.Builder;

import java.util.List;

@Builder
public record StockDetailResponse(String stockName,
                                  Long period,
                                  Long revenue,
                                  Long marketCap,
                                  Double dividendYield,
                                  Double PBR,
                                  Double PER,
                                  Double ROE,
                                  Double PSR,
                                  List<ChartDetail> chartDetail) {

    @Builder
    public record ChartDetail(Long price,
                       Long highPrice,
                       Long lowPrice,
                       Long startPrice,
                       Long endPrice) {
    }

    public static ChartDetail getChartDetail(Chart chart) {
        return ChartDetail.builder()
                .price(chart.getPrice())
                .highPrice(chart.getHighPrice())
                .lowPrice(chart.getLowPrice())
                .startPrice(chart.getStartPrice())
                .endPrice(chart.getEndPrice())
                .build();
    }
}
