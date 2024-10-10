package com.zzf.backend.domain.animal.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.google.gson.Gson;
import com.zzf.backend.domain.animal.dto.AnimalCreateRequest;
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

import java.util.List;

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
class AnimalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";
    private final String tokenNoAnimal = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjkxMzQxOGFmLTZiMmUtMTFlZi05MjlmLTI4YzVkMjFlYWJmNCIsImV4cCI6MTgxNDMzMjI1NX0.c2bfHzpFn5lLckXQaI7V92fe1qDM81L2uaAf37wRV5M";

    @Test
    @DisplayName("동물 타입 조회 - 성공")
    public void animal_type_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(ANIMAL_TYPES_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ANIMAL_TYPES_SUCCESS.getMessage()))
                .andDo(
                        document("동물 타입 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("동물")
                                        .summary("동물 타입 조회 API")
                                        .description("현재 생성 가능한 동물 타입을 조회할 때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body[]").type(JsonFieldType.ARRAY).description("동물 타입 배열"),
                                        fieldWithPath("body[].animalTypeId").type(JsonFieldType.NUMBER).description("ID"),
                                        fieldWithPath("body[].animalTypeName").type(JsonFieldType.STRING).description("타입 이름"),
                                        fieldWithPath("body[].animalAbility").type(JsonFieldType.STRING).description("동물 능력")
                                )
                        )
                );

    }

    @Test
    @DisplayName("동물 생성 - 성공")
    public void create_animal_success() throws Exception {
        // given
        long testTypeId = 1;
        String testAnimalName = "testAnimalName";

        AnimalCreateRequest animalCreateRequest = AnimalCreateRequest.builder()
                .animalTypeId(testTypeId)
                .animalName(testAnimalName)
                .build();
        String content = gson.toJson(animalCreateRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/animal")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenNoAnimal)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(ANIMAL_CREATE_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ANIMAL_CREATE_SUCCESS.getMessage()))
                .andDo(
                        document("동물 생성",
                                ResourceSnippetParameters.builder()
                                        .tag("동물")
                                        .summary("동물 생성 API")
                                        .description("사용자가 새로운 동물을 생성할 때 사용하는 API"),
                                requestFields(
                                        fieldWithPath("animalTypeId").type(JsonFieldType.NUMBER).description("동물 타입"),
                                        fieldWithPath("animalName").type(JsonFieldType.STRING).description("동물 이름")
                                ),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );
    }

    @Test
    @DisplayName("동물 생성 - 이미 진행중인 동물 존재")
    public void create_animal_already_exist() throws Exception {
        // given
        long testTypeId = 1;
        String testAnimalName = "testAnimalName";

        AnimalCreateRequest animalCreateRequest = AnimalCreateRequest.builder()
                .animalTypeId(testTypeId)
                .animalName(testAnimalName)
                .build();
        String content = gson.toJson(animalCreateRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/animal")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(ANIMAL_ALREADY_EXIST.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ANIMAL_ALREADY_EXIST.getMessage()));
    }

    @Test
    @DisplayName("포트폴리오 조회 - 성공")
    public void get_portfolio_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal/{animalId}", 10000)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(PORTFOLIO_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(PORTFOLIO_SUCCESS.getMessage()))
                .andDo(
                        document("포트폴리오 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("동물")
                                        .summary("포트폴리오 조회 API")
                                        .description("사용자가 본인 특정 동물의 포트폴리오를 조회할 때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.animalName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.animalHierarchy").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.animalAbility").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.animalCredit").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.totalAmount").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.totalAssets").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.totalDeposit").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.totalSavings").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.totalStock").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.totalLoan").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.portfolio.depositPercent").type(JsonFieldType.NUMBER).description("예금 비율"),
                                        fieldWithPath("body.portfolio.savingsPercent").type(JsonFieldType.NUMBER).description("적금 비율"),
                                        fieldWithPath("body.portfolio.stockPercent").type(JsonFieldType.NUMBER).description("주식 비율"),
                                        fieldWithPath("body.portfolio.investmentStyle").type(JsonFieldType.STRING).description("투자 방식"),
                                        fieldWithPath("body.portfolio.ending").type(JsonFieldType.STRING).description("엔딩 타입"),
                                        fieldWithPath("body.portfolio.totalFundsPercent").type(JsonFieldType.NUMBER).description("엔딩 타입")
                                )
                        )
                );
    }

    @Test
    @DisplayName("포트폴리오 조회 - 존재하지 않음")
    public void portfolio_not_found_fail() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal/{animalId}", 10001)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(PORTFOLIO_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(PORTFOLIO_NOT_FOUND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("현재 정보 조회 - 성공")
    public void get_info_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal/info")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(ANIMAL_INFO_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ANIMAL_INFO_SUCCESS.getMessage()))
                .andDo(
                        document("현재 정보 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("동물")
                                        .summary("현재 정보 조회 API")
                                        .description("사용자의 현재 정보를 조회할 때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.animalName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.animalAbility").type(JsonFieldType.STRING).description("능력"),
                                        fieldWithPath("body.animalHierarchy").type(JsonFieldType.STRING).description("계급"),
                                        fieldWithPath("body.animalCredit").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.isSolvedQuizToday").type(JsonFieldType.BOOLEAN).description("퀴즈 여부"),
                                        fieldWithPath("body.isWorkToday").type(JsonFieldType.BOOLEAN).description("일 여부"),
                                        fieldWithPath("body.totalAmount").type(JsonFieldType.NUMBER).description("총 자산"),
                                        fieldWithPath("body.totalAssets").type(JsonFieldType.NUMBER).description("가용 자산"),
                                        fieldWithPath("body.totalDeposit").type(JsonFieldType.NUMBER).description("예금 총액"),
                                        fieldWithPath("body.totalSavings").type(JsonFieldType.NUMBER).description("적금 총액"),
                                        fieldWithPath("body.totalStock").type(JsonFieldType.NUMBER).description("주식 총액"),
                                        fieldWithPath("body.totalLoan").type(JsonFieldType.NUMBER).description("대출 총액"),
                                        fieldWithPath("body.totalCapital").type(JsonFieldType.NUMBER).description("사채 총액")
                                )
                        )
                );
    }

    @Test
    @DisplayName("퀘스트 조회 - 성공")
    public void get_quest_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/animal/quest")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(ANIMAL_QUEST_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(ANIMAL_QUEST_SUCCESS.getMessage()))
                .andDo(
                        document("퀘스트 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("동물")
                                        .summary("퀘스트 조회 API")
                                        .description("퀘스트를 조회할 때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.questList[]").type(JsonFieldType.ARRAY).description("퀘스트 리스트"),
                                        fieldWithPath("body.questList[].name").type(JsonFieldType.STRING).description("퀘스트명"),
                                        fieldWithPath("body.questList[].completed").type(JsonFieldType.BOOLEAN).description("클리어 여부"),
                                        fieldWithPath("body.questList[].page").type(JsonFieldType.STRING).description("분류")
                                )
                        )
                );
    }
}