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
public class NextTurnRecord extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "next_turn_record_id")
    private Long nextTurnRecordId;

    @Column(name = "next_turn_record_turn")
    @NotNull
    private Long nextTurnRecordTurn;

    @Column(name = "next_savings_payment")
    @NotNull
    private Long nextSavingsRepayment;

    @Column(name = "next_loan_repayment")
    @NotNull
    private Long nextLoanRepayment;

    @Column(name = "next_capital_repayment")
    @NotNull
    private Long nextCapitalRepayment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    @NotNull
    private Animal animal;
}
