package com.zzf.backend.domain.bank.entity;

import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Capital extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "capital_id")
    @NotNull
    private Integer capitalId;

    @Column(name = "capital_amount")
    @NotNull
    private Integer capitalAmount;

    @Column(name = "capital_start_turn")
    @NotNull
    private Integer capitalStartTurn;

    @Column(name = "capital_end_turn")
    @NotNull
    private Integer capitalEndTurn;

    @Column(name = "capital_warning")
    @NotNull
    private Boolean capitalWarning;

    @Column(name = "capital_is_end")
    @NotNull
    private Boolean capitalIsEnd;

    // FK
    private Integer character;
}
