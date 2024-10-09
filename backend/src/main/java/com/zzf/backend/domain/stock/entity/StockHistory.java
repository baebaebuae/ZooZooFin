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
@Table(name = "stock_history")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StockHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_history_id")
    private Long stockHistoryId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @NotNull
    @Column(name = "trade_count")
    private Long tradeCount;

    @NotNull
    @Column(name = "is_buy")
    private Boolean isBuy;

    @NotNull
    @Column(name = "turn")
    private Long turn;

    @Builder
    public StockHistory(Stock stock, Animal animal, Long tradeCount, Boolean isBuy, Long turn) {
        this.stock = stock;
        this.animal = animal;
        this.tradeCount = tradeCount;
        this.isBuy = isBuy;
        this.turn = turn;
    }
}
