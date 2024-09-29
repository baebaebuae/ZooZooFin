package com.zzf.backend.domain.stock.dto;

import com.zzf.backend.domain.stock.entity.Chart;
import com.zzf.backend.domain.stock.entity.News;
import lombok.Builder;

import java.util.List;

@Builder
public record StockInfoResponse(String stockName,
                                List<ChartInfo> chart,
                                List<NewsInfo> news) {

    @Builder
    public record ChartInfo(Double rate,
                            Long price,
                            Long highPrice,
                            Long lowPrice,
                            Long startPrice,
                            Long endPrice) {
    }

    @Builder
    public record NewsInfo(Long newsId,
                           String title,
                           String provider) {
    }

    public static ChartInfo getChartInfo(Chart chart) {
        return ChartInfo.builder()
                .rate(chart.getRate())
                .price(chart.getPrice())
                .highPrice(chart.getHighPrice())
                .lowPrice(chart.getLowPrice())
                .startPrice(chart.getStartPrice())
                .endPrice(chart.getEndPrice())
                .build();
    }

    public static NewsInfo getNewsInfo(News news) {
        return NewsInfo.builder()
                .newsId(news.getNewsId())
                .title(news.getTitle())
                .provider(news.getProvider())
                .build();
    }
}
