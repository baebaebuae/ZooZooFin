package com.zzf.backend.domain.stock.dto;

import com.zzf.backend.domain.stock.entity.Chart;
import lombok.Builder;

import java.util.List;

@Builder
public record CreationUnitResponse(List<Element> elements,
                                   List<StockDetailResponse.ChartDetail> chartDetail) {

    @Builder
    public record Element(String name,
                          Double percentage) {
    }

    @Builder
    public record ChartDetail(Long price,
                              Long highPrice,
                              Long lowPrice,
                              Long startPrice,
                              Long endPrice) {
    }

    public static StockDetailResponse.ChartDetail getChartDetail(Chart chart) {
        return StockDetailResponse.ChartDetail.builder()
                .price(chart.getPrice())
                .highPrice(chart.getHighPrice())
                .lowPrice(chart.getLowPrice())
                .startPrice(chart.getStartPrice())
                .endPrice(chart.getEndPrice())
                .build();
    }
}
