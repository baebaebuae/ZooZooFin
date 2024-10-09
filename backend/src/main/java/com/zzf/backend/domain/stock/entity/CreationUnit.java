package com.zzf.backend.domain.stock.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "creation_unit")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreationUnit {

    @Id
    @Column(name = "creation_unit_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @NotNull
    @Column(name = "elem_name")
    private String elemName;

    @NotNull
    @Column(name = "elem_percentage")
    private Double elemPercentage;

    @Builder
    public CreationUnit(Stock stock, String elemName, Double elemPercentage) {
        this.stock = stock;
        this.elemName = elemName;
        this.elemPercentage = elemPercentage;
    }
}
