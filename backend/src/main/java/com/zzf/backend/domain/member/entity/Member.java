package com.zzf.backend.domain.member.entity;

import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "member_id")
    private String memberId;

    @NotNull
    @Column(name = "member_gold_bar")
    private Long memberGoldBar;

    @NotNull
    @Column(name = "member_bank_count")
    private Long memberBankCount;

}
