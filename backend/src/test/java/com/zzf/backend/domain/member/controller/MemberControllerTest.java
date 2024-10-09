package com.zzf.backend.domain.member.controller;

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
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("프로필 조회 - 성공")
    public void member_profile_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/member/profile")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(PROFILE_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(PROFILE_SUCCESS.getMessage()))
                .andDo(
                        document("프로필 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("사용자")
                                        .summary("프로필 조회 API")
                                        .description("상단바에 출력되는 사용자 정보를 불러오는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.animalImg").type(JsonFieldType.STRING).description("이미지"),
                                        fieldWithPath("body.animalAssets").type(JsonFieldType.NUMBER).description("가용 자산"),
                                        fieldWithPath("body.memberGoldBar").type(JsonFieldType.NUMBER).description("골드바"),
                                        fieldWithPath("body.turn").type(JsonFieldType.NUMBER).description("턴")
                                )
                        )
                );
    }

    @Test
    @DisplayName("나의 동물 조회 - 성공")
    public void member_animal_list_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/member/animal")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(MY_ANIMAL_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(MY_ANIMAL_SUCCESS.getMessage()))
                .andDo(
                        document("나의 동물 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("사용자")
                                        .summary("나의 동물 조회 API")
                                        .description("사용자의 동물 리스트를 불러오는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.animalNumber").type(JsonFieldType.NUMBER).description("동물 수"),
                                        fieldWithPath("body.animals[]").type(JsonFieldType.ARRAY).description("동물 리스트"),
                                        fieldWithPath("body.animals[].animalId").type(JsonFieldType.NUMBER).description("동물 ID"),
                                        fieldWithPath("body.animals[].animalTypeId").type(JsonFieldType.NUMBER).description("타입"),
                                        fieldWithPath("body.animals[].animalName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.animals[].animalAssets").type(JsonFieldType.NUMBER).description("자산"),
                                        fieldWithPath("body.animals[].createdDate").type(JsonFieldType.STRING).description("생성일")
                                )
                        )
                );
    }
}