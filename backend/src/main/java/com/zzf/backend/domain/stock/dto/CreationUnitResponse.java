package com.zzf.backend.domain.stock.dto;

import com.zzf.backend.domain.stock.entity.Chart;
import lombok.Builder;

import java.util.List;

@Builder
public record CreationUnitResponse(List<Element> elements,
                                   List<ChartDetail> chartDetail) {

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
