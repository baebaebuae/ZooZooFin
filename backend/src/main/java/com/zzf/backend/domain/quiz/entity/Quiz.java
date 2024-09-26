package com.zzf.backend.domain.quiz.entity;

import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Quiz extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Long quizId;

    @Column(name = "quiz_date")
    @NotNull
    private Date quizDate;

    @Column(name = "quiz_question")
    @NotNull
    private String quizQuestion;

    @Column(name = "quiz_answer")
    @NotNull
    private String quizAnswer;

    @Column(name = "quiz_type")
    @NotNull
    private String quizType;
}
