package com.zzf.backend.domain.ending.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.google.gson.Gson;
import com.zzf.backend.domain.ending.dto.EndingRequest;
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
import org.springframework.transaction.annotation.Transactional;

import static com.zzf.backend.global.status.SuccessCode.*;
import static com.zzf.backend.global.status.ErrorCode.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class EndingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("엔딩 생성 - 성공")
    public void create_ending_success() throws Exception {
        // given
        String endingType = "A001";
        EndingRequest endingRequest = EndingRequest.builder()
                .endingType(endingType)
                .build();
        String content = gson.toJson(endingRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/ending")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(ENDING_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ENDING_SUCCESS.getMessage()))
                .andDo(
                        document("엔딩 생성",
                                ResourceSnippetParameters.builder()
                                        .tag("엔딩")
                                        .summary("엔딩 생성 API")
                                        .description("캐릭터 엔딩 관련 로직 처리 및 포트폴리오 생성 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );
    }

    @Test
    @DisplayName("엔딩 생성 - 존재하지 않는 엔딩 타입")
    public void create_ending_type_not_found() throws Exception {
        // given
        String endingType = "incorrect";
        EndingRequest endingRequest = EndingRequest.builder()
                .endingType(endingType)
                .build();
        String content = gson.toJson(endingRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/ending")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(ENDING_STATUS_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ENDING_STATUS_NOT_FOUND_EXCEPTION.getMessage()));
    }
}