package com.zzf.backend.domain.deposit.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DepositType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deposit_type_id")
    private Long depositTypeId;

    @Column(name = "deposit_period")
    @NotNull
    private Long depositPeriod;

    @Column(name = "deposit_rate")
    @NotNull
    private Long depositRate;

    @Column(name = "deposit_name")
    @NotNull
    private String depositName;

    @Column(name = "deposit_img_url")
    @NotNull
    private String depositImgUrl;
}
