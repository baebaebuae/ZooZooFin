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
@Table(name = "financial_statements")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FinancialStatements extends BaseEntity {

    @Id
    @Column(name = "fs_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @NotNull
    @Column(name = "fs_period")
    private Long fsPeriod;

    @Builder
    public FinancialStatements(Stock stock, Long fsPeriod) {
        this.stock = stock;
        this.fsPeriod = fsPeriod;
    }
}
