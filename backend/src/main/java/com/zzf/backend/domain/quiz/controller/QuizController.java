package com.zzf.backend.domain.quiz.controller;

import com.zzf.backend.domain.quiz.dto.QuizDto;
import com.zzf.backend.domain.quiz.dto.QuizRequest;
import com.zzf.backend.domain.quiz.dto.QuizResponse;
import com.zzf.backend.domain.quiz.entity.Quiz;
import com.zzf.backend.domain.quiz.service.QuizService;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.auth.annotation.MemberId;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quiz")
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    public ResponseDto<HashMap<String, List<QuizDto>>> getQuizzesByQuizDate() {
        LocalDate localDate = LocalDate.now();
        Date currentDate = Date.from(localDate
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant());

        List<Quiz> quizzes = quizService.findQuizByQuizDate(currentDate);
        List<QuizDto> quizDtoList = quizzes.stream()
                .map(QuizDto::new)
                .collect(Collectors.toList());

        HashMap<String, List<QuizDto>> map = new HashMap<>();
        map.put("quizzes", quizDtoList);

        return ResponseDto.success(SuccessCode.TODAY_QUIZ_SUCCESS, map);
    }

    @PostMapping("/submit")
    public ResponseDto<QuizResponse> submitQuiz(@MemberId String memberId,
                                                @AnimalId Long animalId,
                                                @RequestBody @Valid QuizRequest quizRequest) {
        QuizResponse quizResponse = quizService.gradeQuizzes(memberId, animalId, quizRequest);

        return ResponseDto.success(SuccessCode.QUIZ_GRADING_SUCCESS, quizResponse);
    }
}
