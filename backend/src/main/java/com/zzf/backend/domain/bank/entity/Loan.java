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
public class Loan extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_id")
    @NotNull
    private Long loanId;

    @Column(name = "loan_type")
    @NotNull
    private Long loanType;

    @Column(name = "loan_rate")
    @NotNull
    private Long loanRate;

    @Column(name = "loan_amount")
    @NotNull
    private Long loanAmount;

    @Column(name = "loan_remain")
    @NotNull
    private Long loanRemain;

    @Column(name = "loan_start_turn")
    @NotNull
    private Long loanStartTurn;

    @Column(name = "loan_period")
    @NotNull
    private Long loanPeriod;

    @Column(name = "loan_to_end")
    @NotNull
    private Long loanToEnd;

    @Column(name = "loan_warning")
    @NotNull
    private Boolean loanWarning;

    @Column(name = "loan_is_end")
    @NotNull
    private Boolean loanIsEnd;

    // FK
    private Long character;
}
