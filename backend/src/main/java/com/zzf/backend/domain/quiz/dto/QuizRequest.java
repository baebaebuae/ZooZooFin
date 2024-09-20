package com.zzf.backend.domain.quiz.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.List;

@Getter
@Setter
public class QuizRequest {

    @Size(min = 5, max = 5, message = "answerList의 길이를 확인하세요.")
    private List<AnswerDto> answerList;

    @Getter
    @Setter
    @UniqueElements
    public static class AnswerDto {
        private Long quizId;
        private String animalAnswer;
    }
}
