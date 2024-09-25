package com.zzf.backend.domain.loan.entity;

import com.zzf.backend.domain.animal.entity.Animal;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
    private Animal animal;

    public void changeLoanIsEnd(boolean isEnd){
        this.loanIsEnd = isEnd;
    }

    public void changeLoanWarning(boolean warn) { this.loanWarning = warn; }

    public void decreaseLoanRemain(long money) { this.loanRemain -= money; }

    public void decreaseLoanToEnd(long decrease) { this.loanToEnd -= decrease; }
}
