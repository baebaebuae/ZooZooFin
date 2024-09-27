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
public class WarningRecord extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warning_record_id")
    private Long warningRecordId;

    @Column(name = "warning_record_turn")
    @NotNull
    private Long warningRecordTurn;

    @Column(name = "warning_savings_count")
    @NotNull
    private Long warningSavingsCount;

    @Column(name = "warning_loan_count")
    @NotNull
    private Long warningLoanCount;

    @Column(name = "deposit_total")
    @NotNull
    private Long depositTotal;

    @Column(name = "deposit_repay")
    @NotNull
    private Long depositRepay;

    @Column(name = "savings_total")
    @NotNull
    private Long savingsTotal;

    @Column(name = "savings_repay")
    @NotNull
    private Long savingsRepay;

    @Column(name = "stock_total")
    @NotNull
    private Long stockTotal;

    @Column(name = "stock_repay")
    @NotNull
    private Long stockRepay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    @NotNull
    private Animal animal;
}