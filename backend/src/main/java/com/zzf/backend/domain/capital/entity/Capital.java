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
    @JoinColumn(name = "character_id")
    private Animal animal;
}
