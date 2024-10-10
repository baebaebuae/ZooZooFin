package com.zzf.backend.domain.stock.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "exchange")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Exchange {

    @Id
    @Column(name = "exchange_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "turn")
    private Long turn;

    @NotNull
    @Column(name = "exchange")
    private Long exchange;

    @NotNull
    @Column(name = "exchange_rate")
    private Double exchangeRate;

}
