package com.zzf.backend.domain.stock.dto;

import com.zzf.backend.domain.stock.entity.Chart;
import com.zzf.backend.domain.stock.entity.StockHistory;
import lombok.Builder;

import java.util.List;

@Builder
public record NotebookStockInfoResponse(String stockName,
                                        Long stockPrice,
                                        Double stockRate,
                                        List<ChartInfo> chart,
                                        Long stockCount,
                                        Long buyTurn,
                                        Double rate,
                                        Long profit,
                                        List<StockHistoryInfo> stockHistory) {

    @Builder
    public record ChartInfo(Double rate,
                            Long price,
                            Long highPrice,
                            Long lowPrice,
                            Long startPrice,
                            Long endPrice) {
    }

    @Builder
    public record StockHistoryInfo(Long turn,
                                   String type,
                                   Long count,
                                   Long price){
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

    public static StockHistoryInfo getStockHistoryInfo(StockHistory stockHistory) {
        return StockHistoryInfo.builder()
                .turn(stockHistory.getTurn())
                .type(stockHistory.getIsBuy() ? "매수" : "매도")
                .count(stockHistory.getTradeCount())
                .price(stockHistory.getTradeAmount())
                .build();
    }
}
