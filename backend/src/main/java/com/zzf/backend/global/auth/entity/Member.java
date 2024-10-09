package com.zzf.backend.global.auth.entity;

import com.zzf.backend.global.auth.security.OAuth2Provider;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider_name")
    private OAuth2Provider providerName;

    @NotNull
    @Column(name = "provider_id")
    private String providerId;

    @NotNull
    @Column(name = "username")
    private String username;

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

    @Builder
    public Member(OAuth2Provider providerName, String providerId, String username, Long goldBar, Boolean isSolvedQuiz, Long bankCount, Long loanCount, Long stockCount) {
        this.providerName = providerName;
        this.providerId = providerId;
        this.username = username;
        this.goldBar = goldBar;
        this.isSolvedQuiz = isSolvedQuiz;
        this.bankCount = bankCount;
        this.loanCount = loanCount;
        this.stockCount = stockCount;
    }
}