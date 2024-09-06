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
public class Deposit extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deposit_id")
    @NotNull
    private Integer depositId;

    @Column(name = "deposit_amount")
    @NotNull
    private Integer depositAmount;

    @Column(name = "deposit_start_turn")
    @NotNull
    private Integer depositStartTurn;

    @Column(name = "deposit_end_turn")
    @NotNull
    private Integer depositEndTurn;

    @Column(name = "deposit_is_end")
    @NotNull
    private Boolean depositIsEnd;

    // FK
    private Integer character;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deposit_type_id")
    @NotNull
    private DepositType depositType;
}
