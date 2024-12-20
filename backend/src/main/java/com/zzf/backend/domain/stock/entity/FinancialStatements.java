package com.zzf.backend.domain.stock.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "financial_statements")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FinancialStatements {

    @Id
    @Column(name = "fs_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fsId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @NotNull
    @Column(name = "period")
    private Long period;

    @NotNull
    @Column(name = "revenue")
    private Long revenue;

    @NotNull
    @Column(name = "market_cap")
    private Long marketCap;

    @NotNull
    @Column(name = "dividend_yield")
    private Double dividendYield;

    @NotNull
    @Column(name = "pbr")
    private Double PBR;

    @NotNull
    @Column(name = "per")
    private Double PER;

    @NotNull
    @Column(name = "roe")
    private Double ROE;

    @NotNull
    @Column(name = "psr")
    private Double PSR;

    @Builder
    public FinancialStatements(Stock stock, Long period, Long revenue, Long marketCap, Double dividendYield, Double PBR, Double PER, Double ROE, Double PSR) {
        this.stock = stock;
        this.period = period;
        this.revenue = revenue;
        this.marketCap = marketCap;
        this.dividendYield = dividendYield;
        this.PBR = PBR;
        this.PER = PER;
        this.ROE = ROE;
        this.PSR = PSR;
    }
}
