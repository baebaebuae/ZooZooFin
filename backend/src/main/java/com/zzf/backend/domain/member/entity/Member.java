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
    @Column(name = "member_gold_bar")
    private Long memberGoldBar;

    @NotNull
    @Column(name = "member_is_solve_quiz")
    private Boolean memberIsSolveQuiz;

}
