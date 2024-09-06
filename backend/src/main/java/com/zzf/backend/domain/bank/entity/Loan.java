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
    private Integer loanId;

    @Column(name = "loan_type")
    @NotNull
    private Integer loanType;

    @Column(name = "loan_rate")
    @NotNull
    private Integer loanRate;

    @Column(name = "loan_amount")
    @NotNull
    private Integer loanAmount;

    @Column(name = "loan_start_turn")
    @NotNull
    private Integer loanStartTurn;

    @Column(name = "loan_end_turn")
    @NotNull
    private Integer loanEndTurn;

    @Column(name = "loan_to_end")
    @NotNull
    private Integer loanToEnd;

    @Column(name = "loan_warning")
    @NotNull
    private Boolean loanWarning;

    @Column(name = "loan_is_end")
    @NotNull
    private Boolean loanIsEnd;

    // FK
    private Integer character;
}
