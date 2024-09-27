package com.zzf.backend.domain.home.entity;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TurnRecord extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "turn_record_id")
    private Long turnRecordId;

    @Column(name = "turn_record_turn")
    @NotNull
    private Long turnRecordTurn;

    @Column(name = "daily_charge")
    @NotNull
    private Long dailyCharge;

    @Column(name = "loan_make")
    @NotNull
    private Long loanMake;

    @Column(name = "loan_repay")
    @NotNull
    private Long loanRepay;

    @Column(name = "stock_buy")
    @NotNull
    private Long stockBuy;

    @Column(name = "stock_sell")
    @NotNull
    private Long stockSell;

    @Column(name = "deposit_make")
    @NotNull
    private Long depositMake;

    @Column(name = "deposit_finish")
    @NotNull
    private Long depositFinish;

    @Column(name = "savings_make")
    @NotNull
    private Long savingsMake;

    @Column(name = "savings_pay")
    @NotNull
    private Long savingsPay;

    @Column(name = "savings_finish")
    @NotNull
    private Long savingsFinish;

    @Column(name = "capital_make")
    @NotNull
    private Long capitalMake;

    @Column(name = "capital_repay")
    @NotNull
    private Long capitalRepay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    @NotNull
    private Animal animal;
}
