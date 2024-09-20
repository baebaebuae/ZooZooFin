package com.zzf.backend.domain.quiz.repository;

import com.zzf.backend.domain.quiz.entity.Quiz;
import jakarta.validation.constraints.Digits;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    // 해당 일자 퀴즈 리스트 조회
    List<Quiz> findByQuizDate(Date quizDate);

    // quiz id로 단일 퀴즈 조회
    Optional<Quiz> findByQuizId(Long quizId);
}
