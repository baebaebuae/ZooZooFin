package com.zzf.backend.domain.quiz.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.quiz.entity.Quiz;
import com.zzf.backend.domain.quiz.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {

    // 캐릭터의 퀴즈 결과 조회
    Optional<QuizResult> findAllByAnimalAndQuiz(Animal animal, Quiz quiz);
}
