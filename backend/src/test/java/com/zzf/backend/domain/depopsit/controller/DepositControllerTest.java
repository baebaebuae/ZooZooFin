package com.zzf.backend.domain.depopsit.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.animal.repository.AnimalTypeRepository;
import com.zzf.backend.domain.deposit.dto.DepositDeleteRequest;
import com.zzf.backend.domain.deposit.dto.DepositRequest;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.global.auth.repository.MemberRepository;
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

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.document;
import static com.zzf.backend.global.status.SuccessCode.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class DepositControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("예금 타입 조회 - 성공")
    public void deposit_type_success() throws Exception {
        //given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/deposit")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("예금 타입 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("예금")
                                        .summary("예금 타입 조회 API")
                                        .description("가입 가능한 예금 상품을 조회할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body[]").type(JsonFieldType.ARRAY).description("총액"),
                                        fieldWithPath("body[].typeId").type(JsonFieldType.NUMBER).description("예금 타입 ID"),
                                        fieldWithPath("body[].period").type(JsonFieldType.NUMBER).description("기간"),
                                        fieldWithPath("body[].rate").type(JsonFieldType.NUMBER).description("이율"),
                                        fieldWithPath("body[].name").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body[].imgUrl").type(JsonFieldType.STRING).description("이미지")
                                )
                        )
                );
    }

    @Test
    @DisplayName("예금 등록 - 성공")
    public void create_deposit_success() throws Exception {
        // given
        long typeId = 10000;
        long money = 1000000;
        DepositRequest depositRequest = DepositRequest.builder()
                .typeId(typeId)
                .money(money)
                .build();
        String content = gson.toJson(depositRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/deposit")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(CREATE_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(CREATE_SUCCESS.getMessage()))
                .andDo(
                        document("예금 등록",
                                ResourceSnippetParameters.builder()
                                        .tag("예금")
                                        .summary("예금 등록 API")
                                        .description("예금을 등록할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );
    }

    @Test
    @DisplayName("나의 예금 조회 - 성공")
    public void my_deposit_success() throws Exception {
        //given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/deposit/my")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("나의 에금 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("예금")
                                        .summary("나의 예금 조회 API")
                                        .description("현재 가입한 예금 상품을 조회할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body[]").type(JsonFieldType.ARRAY).description("예금 리스트"),
                                        fieldWithPath("body[].depositId").type(JsonFieldType.NUMBER).description("예금 ID"),
                                        fieldWithPath("body[].name").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body[].period").type(JsonFieldType.NUMBER).description("기간"),
                                        fieldWithPath("body[].amount").type(JsonFieldType.NUMBER).description("가입 금액"),
                                        fieldWithPath("body[].rate").type(JsonFieldType.NUMBER).description("이율"),
                                        fieldWithPath("body[].finalReturn").type(JsonFieldType.NUMBER).description("최종 지급액"),
                                        fieldWithPath("body[].deleteReturn").type(JsonFieldType.NUMBER).description("중도해지 지급액"),
                                        fieldWithPath("body[].restTurn").type(JsonFieldType.NUMBER).description("남은 회차"),
                                        fieldWithPath("body[].endTurn").type(JsonFieldType.NUMBER).description("만기 회차"),
                                        fieldWithPath("body[].depositImgUrl").type(JsonFieldType.STRING).description("이미지")
                                )
                        )
                );
    }

    @Test
    @DisplayName("예금 해지 - 성공")
    public void delete_deposit_success() throws Exception {
        // given
        long depositId = 10000;
        DepositDeleteRequest depositDeleteRequest = DepositDeleteRequest.builder()
                .depositId(depositId)
                .build();
        String content = gson.toJson(depositDeleteRequest);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/api/v1/deposit/my")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(UPDATE_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(UPDATE_SUCCESS.getMessage()))
                .andDo(
                        document("예금 해지",
                                ResourceSnippetParameters.builder()
                                        .tag("예금")
                                        .summary("예금 해지 API")
                                        .description("예금을 해지할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );
    }
}
