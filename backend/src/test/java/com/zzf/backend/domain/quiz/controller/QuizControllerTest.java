package com.zzf.backend.domain.quiz.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.zzf.backend.global.status.SuccessCode.QUIZ_SUCCESS;
import static com.zzf.backend.global.status.SuccessCode.TODAY_QUIZ_SUCCESS;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class QuizControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("오늘의 퀴즈 조회 - 성공")
    public void today_quiz_success() throws Exception {
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
                .andExpect(jsonPath("$.message").value(TODAY_QUIZ_SUCCESS.getMessage()))
                .andDo(
                        document("오늘의 퀴즈 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("퀴즈")
                                        .summary("오늘의 퀴즈 조회 API")
                                        .description("오늘의 퀴즈를 조회할 때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.quizzes[]").type(JsonFieldType.ARRAY).description("퀴즈 리스트"),
                                        fieldWithPath("body.quizzes[].quizId").type(JsonFieldType.NUMBER).description("퀴즈 ID"),
                                        fieldWithPath("body.quizzes[].quizQuestion").type(JsonFieldType.STRING).description("퀴즈 문제"),
                                        fieldWithPath("body.quizzes[].quizAnswer").type(JsonFieldType.STRING).description("퀴즈 답"),
                                        fieldWithPath("body.quizzes[].quizType").type(JsonFieldType.STRING).description("퀴즈 유형")
                                )
                        )
                );
    }

//    @Test
//    @DisplayName("퀴즈 채점 - 성공")
//    public void submit_quiz() throws Exception {
//        // given
//        final String url = "/api/v1/quiz/{id}";
//        final long quizId = 1;
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/api/'" +
//                        "", quizId)
//                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
//                        .contentType(MediaType.APPLICATION_JSON)
//        );
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.httpStatus").value(QUIZ_SUCCESS.getHttpStatus()))
//                .andExpect(jsonPath("$.message").value(QUIZ_SUCCESS.getMessage()))
//                .andExpect(jsonPath("$.body.quizId").value(quizId));
//    }
}