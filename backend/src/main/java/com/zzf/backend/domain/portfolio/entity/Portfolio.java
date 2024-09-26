package com.zzf.backend.domain.portfolio.entity;

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
@Table(name = "portfolio")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Portfolio extends BaseEntity {

    @Id
    @Column(name = "portfolio_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long portfolioId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @NotNull
    @Column(name = "portfolio_ending")
    private String portfolioEnding;

    @NotNull
    @Column(name = "portfolio_deposit_percent")
    private Double portfolioDepositPercent;

    @NotNull
    @Column(name = "portfolio_savings_percent")
    private Double portfolioSavingsPercent;

    @NotNull
    @Column(name = "portfolio_stock_percent")
    private Double portfolioStockPercent;

    @NotNull
    @Column(name = "portfolio_invest_style")
    private String portfolioInvestStyle;

    @NotNull
    @Column(name = "portfolio_score")
    private Long portfolioScore;

    @Builder
    public Portfolio(Animal animal, String portfolioEnding, Double portfolioDepositPercent, Double portfolioSavingsPercent, Double portfolioStockPercent, String portfolioInvestStyle, Long portfolioScore) {
        this.animal = animal;
        this.portfolioEnding = portfolioEnding;
        this.portfolioDepositPercent = portfolioDepositPercent;
        this.portfolioSavingsPercent = portfolioSavingsPercent;
        this.portfolioStockPercent = portfolioStockPercent;
        this.portfolioInvestStyle = portfolioInvestStyle;
        this.portfolioScore = portfolioScore;
    }
}
