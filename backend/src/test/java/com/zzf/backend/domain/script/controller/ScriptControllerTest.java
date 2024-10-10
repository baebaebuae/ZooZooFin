package com.zzf.backend.domain.script.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.google.gson.Gson;
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
class ScriptControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("튜토리얼 스크립트 조회 - 성공")
    public void tutorial_script_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/scripts/tutorial")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(SCRIPT_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(SCRIPT_SUCCESS.getMessage()))
                .andDo(
                        document("튜토리얼 스크립트 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("스크립트")
                                        .summary("튜토리얼 스크립트 조회 API")
                                        .description("튜토리얼 스크립트를 불러오는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.category").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("body.scripts[]").type(JsonFieldType.ARRAY).description("스크립트"),
                                        fieldWithPath("body.scripts[].scriptId").type(JsonFieldType.NUMBER).description("스크립트 ID"),
                                        fieldWithPath("body.scripts[].type").type(JsonFieldType.STRING).description("타입"),
                                        fieldWithPath("body.scripts[].content").type(JsonFieldType.STRING).description("내용"),
                                        fieldWithPath("body.scripts[].responses[]").type(JsonFieldType.ARRAY).description("응답"),
                                        fieldWithPath("body.scripts[].responses[].nextScript").type(JsonFieldType.NUMBER).optional().description("다음 스크립트"),
                                        fieldWithPath("body.scripts[].responses[].selection").type(JsonFieldType.STRING).optional().description("선택지")
                                )
                        )
                );
    }

    @Test
    @DisplayName("스크립트 조회 - 성공")
    public void script_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/scripts/category")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("category", "bank")
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(SCRIPT_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(SCRIPT_SUCCESS.getMessage()))
                .andDo(
                        document("스크립트 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("스크립트")
                                        .summary("스크립트 조회 API")
                                        .description("지정한 카테고리의 스크립트를 불러오는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.category").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("body.scripts[]").type(JsonFieldType.ARRAY).description("스크립트"),
                                        fieldWithPath("body.scripts[].scriptId").type(JsonFieldType.NUMBER).description("스크립트 ID"),
                                        fieldWithPath("body.scripts[].type").type(JsonFieldType.STRING).description("타입"),
                                        fieldWithPath("body.scripts[].content").type(JsonFieldType.STRING).description("내용"),
                                        fieldWithPath("body.scripts[].responses[]").type(JsonFieldType.ARRAY).description("응답"),
                                        fieldWithPath("body.scripts[].responses[].nextScript").type(JsonFieldType.NUMBER).optional().description("다음 스크립트"),
                                        fieldWithPath("body.scripts[].responses[].selection").type(JsonFieldType.STRING).optional().description("선택지")
                                )
                        )
                );
    }
}