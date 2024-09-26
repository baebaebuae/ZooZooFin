package com.zzf.backend.domain.quiz.controller;

import com.zzf.backend.domain.quiz.service.QuizService;
import com.zzf.backend.domain.quiz.service.QuizServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.zzf.backend.global.status.SuccessCode.QUIZ_SUCCESS;
import static com.zzf.backend.global.status.SuccessCode.TODAY_QUIZ_SUCCESS;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Quiz Test")
@Transactional
@SpringBootTest
//@WebMvcTest(QuizController.class)
@AutoConfigureMockMvc
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@RequiredArgsConstructor
class QuizControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjkxMzQxOGFmLTZiMmUtMTFlZi05MjlmLTI4YzVkMjFlYWJmMyIsImV4cCI6MTgxMzMzMDU4Nn0.ZgnLrGNNi9xt-jlJAgyNOAn6-_yw4m5C9SOUkk5zyPY";

    @Test
    public void today_quiz() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/quiz")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(TODAY_QUIZ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(TODAY_QUIZ_SUCCESS.getMessage()));
    }

    @Test
    public void read_quiz() throws Exception {
        // given
        final String url = "/api/v1/quiz/{id}";
        final long quizId = 1;

        // when
        ResultActions actions = mockMvc.perform(
                get(url, quizId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(QUIZ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(QUIZ_SUCCESS.getMessage()))
                .andExpect(jsonPath("$.body.quizId").value(quizId));
    }
}