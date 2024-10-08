package com.zzf.backend.domain.ranking.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
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

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.zzf.backend.global.status.SuccessCode.READ_SUCCESS;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RankingControllerTest {
    @Autowired
    private MockMvc mockMvc;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("랭킹 조회 - 성공")
    public void ranking_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/ranking")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("랭킹 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("랭킹")
                                        .summary("랭킹 조회 API")
                                        .description("랭킹을 조회할 때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body[]").type(JsonFieldType.ARRAY).description("랭킹 리스트"),
                                        fieldWithPath("body[].rank").type(JsonFieldType.NUMBER).description("순위"),
                                        fieldWithPath("body[].totalAsset").type(JsonFieldType.NUMBER).description("총 자산"),
                                        fieldWithPath("body[].characterName").type(JsonFieldType.STRING).description("캐릭터 이름"),
                                        fieldWithPath("body[].characterImg").type(JsonFieldType.STRING).description("캐릭터 이미지 URL")
                                )
                        )
                );
    }
}
