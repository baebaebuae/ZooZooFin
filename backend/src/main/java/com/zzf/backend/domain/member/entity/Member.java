package com.zzf.backend.domain.member.entity;

import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "member_id")
    private String memberId;

    @NotNull
    @Column(name = "member_gold_bar")
    private Long memberGoldBar;

    @NotNull
    @Column(name = "member_is_solve_quiz")
    private Boolean memberIsSolveQuiz;

    @NotNull
    @Column(name = "member_bank_count")
    private Long memberBankCount;

    @Builder
    public Member(Long memberGoldBar, Boolean memberIsSolveQuiz, Long memberBankCount) {
        this.memberGoldBar = memberGoldBar;
        this.memberIsSolveQuiz = memberIsSolveQuiz;
        this.memberBankCount = memberBankCount;
    }
}
