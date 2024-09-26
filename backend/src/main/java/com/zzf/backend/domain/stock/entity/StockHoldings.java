package com.zzf.backend.domain.stock.entity;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "stock_holdings")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockHoldings extends BaseEntity {

    @Id
    @Column(name = "stock_holdings_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockHoldingsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @NotNull
    @Column(name = "stock_count")
    private Long stockCount;

    @NotNull
    @Column(name = "stock_average_price")
    private Long stockAveragePrice;

    @NotNull
    @Column(name = "stock_is_sold")
    private Boolean stockIsSold;

    @Builder
    public StockHoldings(Stock stock, Animal animal, Long stockCount, Long stockAveragePrice, Boolean stockIsSold) {
        this.stock = stock;
        this.animal = animal;
        this.stockCount = stockCount;
        this.stockAveragePrice = stockAveragePrice;
        this.stockIsSold = stockIsSold;
    }
}
