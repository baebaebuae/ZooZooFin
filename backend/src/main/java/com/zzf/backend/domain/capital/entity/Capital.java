package com.zzf.backend.domain.capital.entity;

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
public class Capital extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "capital_id")
    private Long capitalId;

    @Column(name = "capital_amount")
    @NotNull
    private Long capitalAmount;

    @Column(name = "capital_remain")
    @NotNull
    private Long capitalRemain;

    @Column(name = "capital_start_turn")
    @NotNull
    private Long capitalStartTurn;

    @Column(name = "capital_end_turn")
    @NotNull
    private Long capitalEndTurn;

    @Column(name = "capital_is_end")
    @NotNull
    private Boolean capitalIsEnd;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    public void changeCapitalRemain(Long money){
        this.capitalRemain = money;
    }

    /**
     *  복리, capitalRemain을 10% 증가시키는 메소드
     */
    public void compoundInterest(){
        this.capitalRemain += this.capitalRemain / 10;
    }

    public void changeCapitalIsEnd(boolean isEnd){
        this.capitalIsEnd = isEnd;
    }
}
