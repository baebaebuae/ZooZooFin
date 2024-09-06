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
public class Savings extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "savings_id")
    @NotNull
    private Integer savingsId;

    @Column(name = "savings_payment")
    @NotNull
    private Integer savingsPayment;

    @Column(name = "savings_amount")
    @NotNull
    private Integer savingsAmount;

    @Column(name = "savings_start_turn")
    @NotNull
    private Integer savingsStartTurn;

    @Column(name = "savings_end_turn")
    @NotNull
    private Integer savingsEndTurn;

    @Column(name = "savings_warning")
    @NotNull
    private Boolean savingsWarning;

    @Column(name = "savings_is_end")
    @NotNull
    private Boolean savingsIsEnd;

    // FK
    private Integer character;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "savings_type_id")
    @NotNull
    private SavingsType savingsType;
}
