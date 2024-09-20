package com.zzf.backend.domain.quiz.dto;

import com.zzf.backend.domain.quiz.entity.Quiz;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class QuizDto {

    private final Long quizId;
    private final String quizQuestion;
    private final String quizAnswer;

    public QuizDto(Quiz quiz) {
        this.quizId = quiz.getQuizId();
        this.quizQuestion = quiz.getQuizQuestion();
        this.quizAnswer = quiz.getQuizAnswer();
    }
}
