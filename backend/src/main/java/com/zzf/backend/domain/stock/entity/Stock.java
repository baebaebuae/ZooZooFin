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
@Table(name = "stock")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stock extends BaseEntity {

    @Id
    @Column(name = "stock_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockId;

    @NotNull
    @Column(name = "stock_type")
    private String stockType;

    @NotNull
    @Column(name = "stock_name")
    private String stockName;

    @NotNull
    @Column(name = "stock_code")
    private String stockCode;

    @NotNull
    @Column(name = "stock_info")
    private String stockInfo;

    @NotNull
    @Column(name = "stock_description")
    private String stockDescription;

    @NotNull
    @Column(name = "stock_img")
    private String stockImg;

    @NotNull
    @Column(name = "stock_dividends")
    private Long stockDividends;

    @NotNull
    @Column(name = "stock_field")
    private String stockField;

    @Builder
    public Stock(String stockType, String stockName, String stockCode, String stockInfo, String stockDescription, String stockImg, Long stockDividends, String stockField) {
        this.stockType = stockType;
        this.stockName = stockName;
        this.stockCode = stockCode;
        this.stockInfo = stockInfo;
        this.stockDescription = stockDescription;
        this.stockImg = stockImg;
        this.stockDividends = stockDividends;
        this.stockField = stockField;
    }
}
