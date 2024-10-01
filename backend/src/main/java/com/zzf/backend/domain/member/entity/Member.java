package com.zzf.backend.domain.member.entity;

import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member extends BaseEntity {

    @Id
    @Column(name = "member_id")
    private String memberId;

    @NotNull
    @Column(name = "kakao_member_id")
    private String kakaoMemberId;

    @NotNull
    @Column(name = "gold_bar")
    private Long goldBar;

    @NotNull
    @Column(name = "is_solved_quiz")
    private Boolean isSolvedQuiz;

    @NotNull
    @Column(name = "bank_count")
    private Long bankCount;

    @NotNull
    @Column(name = "loan_count")
    private Long loanCount;

    @NotNull
    @Column(name = "stock_count")
    private Long stockCount;

}
