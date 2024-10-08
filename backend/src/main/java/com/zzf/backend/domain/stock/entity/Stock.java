package com.zzf.backend.domain.stock.entity;

import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Getter
@Table(name = "stock")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Stock {

    @Id
    @Column(name = "stock_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockId;

    @NotNull
    @Column(name = "stock_type")
    private String stockType;

    @NotNull
    @Column(name = "stock_original_name")
    private String stockOriginalName;

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
    @Length(max = 1000)
    @Column(name = "stock_description")
    private String stockDescription;

    @NotNull
    @Column(name = "stock_img")
    private String stockImg;

    @NotNull
    @Column(name = "stock_field")
    private String stockField;

    @Builder
    public Stock(String stockType, String stockOriginalName, String stockName, String stockCode, String stockInfo, String stockDescription, String stockImg, String stockField) {
        this.stockType = stockType;
        this.stockOriginalName = stockOriginalName;
        this.stockName = stockName;
        this.stockCode = stockCode;
        this.stockInfo = stockInfo;
        this.stockDescription = stockDescription;
        this.stockImg = stockImg;
        this.stockField = stockField;
    }
}
