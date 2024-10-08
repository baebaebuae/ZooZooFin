package com.zzf.backend.domain.quiz.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuizResponse {
    private Long score;
    private List<QuizGrading> quizResults;

    @Getter
    @Setter
    public static class QuizGrading {
        private Long quizId;
        private String quizAnswer;
        private String animalAnswer;
        private Boolean isCorrect;
    }
}
