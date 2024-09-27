package com.zzf.backend.domain.stock.entity;

import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "chart")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chart extends BaseEntity {

    @Id
    @Column(name = "chart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chartId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @NotNull
    @Column(name = "chart_turn")
    private Long chartTurn;

    @NotNull
    @Column(name = "chart_rate")
    private Double chartRate;

    @NotNull
    @Column(name = "chart_buy")
    private Long chartBuy;

    @NotNull
    @Column(name = "chart_sell")
    private Long chartSell;

    @NotNull
    @Column(name = "chart_high")
    private Long chartHigh;

    @NotNull
    @Column(name = "chart_low")
    private Long chartLow;

    @NotNull
    @Column(name = "chart_start")
    private Long chartStart;

    @NotNull
    @Column(name = "chart_end")
    private Long chartEnd;

    @Builder
    public Chart(Stock stock, Long chartTurn, Double chartRate, Long chartBuy, Long chartSell, Long chartHigh, Long chartLow, Long chartStart, Long chartEnd) {
        this.stock = stock;
        this.chartTurn = chartTurn;
        this.chartRate = chartRate;
        this.chartBuy = chartBuy;
        this.chartSell = chartSell;
        this.chartHigh = chartHigh;
        this.chartLow = chartLow;
        this.chartStart = chartStart;
        this.chartEnd = chartEnd;
    }
}
