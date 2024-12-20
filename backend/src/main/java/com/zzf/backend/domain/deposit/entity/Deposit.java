package com.zzf.backend.domain.deposit.entity;

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
public class Deposit extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deposit_id")
    private Long depositId;

    @Column(name = "deposit_amount")
    @NotNull
    private Long depositAmount;

    @Column(name = "deposit_start_turn")
    @NotNull
    private Long depositStartTurn;

    @Column(name = "deposit_end_turn")
    @NotNull
    private Long depositEndTurn;

    @Column(name = "deposit_is_end")
    @NotNull
    private Boolean depositIsEnd;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    @NotNull
    private Animal animal;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deposit_type_id")
    @NotNull
    private DepositType depositType;

    public void changeDepositIsEnd(Boolean isEnd){
        this.depositIsEnd = isEnd;
    }
}
