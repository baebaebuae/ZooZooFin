package com.zzf.backend.domain.bank.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SavingsType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "savings_type_id")
    @NotNull
    private Integer savingsTypeId;

    @Column(name = "savings_period")
    @NotNull
    private Integer savingsPeriod;

    @Column(name = "savings_rate")
    @NotNull
    private Integer savingsRate;

    @Column(name = "savings_name")
    @NotNull
    private String savingsName;

    @Column(name = "savings_img_url")
    @NotNull
    private String savingsImgUrl;
}
