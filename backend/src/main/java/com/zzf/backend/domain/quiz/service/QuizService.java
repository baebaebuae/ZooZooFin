package com.zzf.backend.domain.quiz.service;

import com.zzf.backend.domain.quiz.dto.QuizRequest;
import com.zzf.backend.domain.quiz.dto.QuizResponse;
import com.zzf.backend.domain.quiz.entity.Quiz;

import java.util.Date;
import java.util.List;

public interface QuizService {
    List<Quiz> findQuizByQuizDate(Date quizDate);
    Quiz findQuizByQuizId(Long quizId);
    QuizResponse gradeQuizzes(Long animalId, QuizRequest quizRequest);
}
