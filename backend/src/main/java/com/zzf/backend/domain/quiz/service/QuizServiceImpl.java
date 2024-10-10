package com.zzf.backend.domain.quiz.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.quiz.dto.QuizRequest;
import com.zzf.backend.domain.quiz.dto.QuizResponse;
import com.zzf.backend.domain.quiz.entity.Quiz;
import com.zzf.backend.domain.quiz.entity.QuizResult;
import com.zzf.backend.domain.quiz.repository.QuizRepository;
import com.zzf.backend.domain.quiz.repository.QuizResultRepository;
import com.zzf.backend.global.auth.entity.Member;
import com.zzf.backend.global.auth.repository.MemberRepository;
import com.zzf.backend.global.exception.CustomException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {
    private final AnimalRepository animalRepository;
    private final QuizRepository quizRepository;
    private final QuizResultRepository quizResultRepository;
    private final MemberRepository memberRepository;

    // 해당 일자 퀴즈 결과 조회
    @Override
    public List<Quiz> findQuizByQuizDate(Date quizDate)
    {
        return quizRepository.findByQuizDate(quizDate);
    }

    // 퀴즈 ID로 퀴즈 조회
    @Override
    public Quiz findQuizByQuizId(Long quizId)
    {
        return quizRepository.findByQuizId(quizId).orElseThrow(()-> new CustomException(QUIZ_NOT_FOUND_EXCEPTION));
    }

    // 퀴즈 채점
    @Override
    @Transactional
    public QuizResponse gradeQuizzes(String memberId, Long animalId, QuizRequest quizRequest)
    {
        Member member = memberRepository.findByUsername(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        // quiz validator
        Set<Long> setQuizIds = new HashSet<>();
        for (QuizRequest.AnswerDto answerDto : quizRequest.getAnswerList()) {
            Long quizId = answerDto.getQuizId();
            if (setQuizIds.contains(quizId)) {
                throw new CustomException(DUPLICATE_QUIZ_ID_EXCEPTION);
            }
            setQuizIds.add(quizId);
        }


        QuizResponse quizResponse = new QuizResponse();
        List<QuizResponse.QuizGrading> quizGradingList = new ArrayList<>();
        long score = 0;

        for (QuizRequest.AnswerDto answerDto : quizRequest.getAnswerList()) {
            Quiz quiz = quizRepository.findByQuizId(answerDto.getQuizId()).orElseThrow(() -> new CustomException(QUIZ_NOT_FOUND_EXCEPTION));

            String animalAnswer = answerDto.getAnimalAnswer();
            boolean isCorrect = quiz.getQuizAnswer()
                    .equals(animalAnswer);

            QuizResult quizResult = QuizResult.builder()
                    .animal(animal)
                    .quiz(quiz)
                    .isCorrect(isCorrect)
                    .animalAnswer(animalAnswer)
                    .build();

            quizResultRepository.save(quizResult);

            // 점수 계산
            if (isCorrect) {
                score += 20;
            }

            // 정리
            QuizResponse.QuizGrading quizGrading = new QuizResponse.QuizGrading();
            quizGrading.setQuizId(quiz.getQuizId());
            quizGrading.setQuizAnswer(quiz.getQuizAnswer());
            quizGrading.setAnimalAnswer(animalAnswer);
            quizGrading.setIsCorrect(isCorrect);
            quizGradingList.add(quizGrading);
            
        }
        // goldBar 추가
        member.setGoldBar(member.getGoldBar() + score);
        memberRepository.save(member);

        quizResponse.setQuizResults(quizGradingList);
        quizResponse.setScore(score);

        return quizResponse;
    }
}
