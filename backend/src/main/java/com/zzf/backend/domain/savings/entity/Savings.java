package com.zzf.backend.domain.savings.entity;

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
public class Savings extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "savings_id")
    private Long savingsId;

    @Column(name = "savings_payment")
    @NotNull
    private Long savingsPayment;

    @Column(name = "savings_amount")
    @NotNull
    private Long savingsAmount;

    @Column(name = "savings_start_turn")
    @NotNull
    private Long savingsStartTurn;

    @Column(name = "savings_end_turn")
    @NotNull
    private Long savingsEndTurn;

    @Column(name = "savings_warning")
    @NotNull
    private Boolean savingsWarning;

    @Column(name = "savings_is_end")
    @NotNull
    private Boolean savingsIsEnd;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id")
    @NotNull
    private Animal animal;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "savings_type_id")
    @NotNull
    private SavingsType savingsType;

    public void changeSavingsIsEnd(Boolean isEnd){
        this.savingsIsEnd = isEnd;
    }

    public void changeSavingsWarning(Boolean warn){
        this.savingsWarning = warn;
    }

    public void increaseSavingsAmount(Long money){
        this.savingsAmount += money;
    }
}
