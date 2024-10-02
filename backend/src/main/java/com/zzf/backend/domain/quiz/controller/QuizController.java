package com.zzf.backend.domain.quiz.controller;

import com.zzf.backend.domain.quiz.dto.QuizDto;
import com.zzf.backend.domain.quiz.dto.QuizRequest;
import com.zzf.backend.domain.quiz.dto.QuizResponse;
import com.zzf.backend.domain.quiz.entity.Quiz;
import com.zzf.backend.domain.quiz.service.QuizServiceImpl;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Quiz", description = "Quiz API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quiz")
public class QuizController {

    private final QuizServiceImpl quizServiceImpl;

    // 퀴즈 일자 별 퀴즈 목록 조회
    @GetMapping("")
    public ResponseDto<HashMap<String, List<QuizDto>>> getQuizzesByQuizDate() {
        // 로컬 일자
        LocalDate localDate = LocalDate.now();
        Date currentDate = Date.from(localDate
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant());

        // 해당 일자의 퀴즈 목록 조회
        List<Quiz> quizzes = quizServiceImpl.findQuizByQuizDate(currentDate);
        List<QuizDto> quizDtoList = quizzes.stream()
                .map(QuizDto::new)
                .collect(Collectors.toList());

        // quizzes
        HashMap<String, List<QuizDto>> map = new HashMap<>();
        map.put("quizzes", quizDtoList);

        return ResponseDto.success(SuccessCode.TODAY_QUIZ_SUCCESS, map);
    }

    // 퀴즈 ID로 퀴즈 조회
    @GetMapping("/{quizId}")
    public ResponseDto<QuizDto> getQuizById(@PathVariable(name = "quizId") Long quizId) {
        Quiz quiz = quizServiceImpl.findQuizByQuizId(quizId);
        QuizDto quizDto = new QuizDto(quiz);
        return ResponseDto.success(SuccessCode.QUIZ_SUCCESS, quizDto);
    }

    // 퀴즈 채점 결과
    @PostMapping("/submit")
    public ResponseDto<QuizResponse> submitQuiz(
            @AnimalId Long animalId,
            @RequestBody @Valid QuizRequest quizRequest) {
        QuizResponse quizResponse = quizServiceImpl.gradeQuizzes(animalId, quizRequest);
        return ResponseDto.success(SuccessCode.QUIZ_GRADING_SUCCESS, quizResponse);
    }


}
