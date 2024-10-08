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
public class Chart {

    @Id
    @Column(name = "chart_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chartId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @NotNull
    @Column(name = "turn")
    private Long turn;

    @NotNull
    @Column(name = "rate")
    private Double rate;

    @NotNull
    @Column(name = "price")
    private Long price;

    @NotNull
    @Column(name = "high_price")
    private Long highPrice;

    @NotNull
    @Column(name = "low_price")
    private Long lowPrice;

    @NotNull
    @Column(name = "start_price")
    private Long startPrice;

    @NotNull
    @Column(name = "end_price")
    private Long endPrice;

    @Builder
    public Chart(Stock stock, Long turn, Double rate, Long price, Long highPrice, Long lowPrice, Long startPrice, Long endPrice) {
        this.stock = stock;
        this.turn = turn;
        this.rate = rate;
        this.price = price;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.startPrice = startPrice;
        this.endPrice = endPrice;
    }
}
