package com.zzf.backend.domain.capital.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.google.gson.Gson;
import com.zzf.backend.domain.capital.dto.CapitalRepayRequest;
import com.zzf.backend.domain.capital.dto.CapitalRequest;
import com.zzf.backend.domain.loan.dto.LoanDeleteRequest;
import com.zzf.backend.domain.stock.dto.SellStockRequest;
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
class CapitalControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("사채 가능 여부 조회 - 성공")
    public void capital_available_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/capital")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("사채 가능 여부 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("사채")
                                        .summary("사채 가능 여부 조회 API")
                                        .description("이미 사채 이력이 존재하는지 확인하고 가능 여부를 알려주는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.capitalExist").type(JsonFieldType.BOOLEAN).description("가능 여부")
                                )
                        )
                );

    }

    @Test
    @DisplayName("사채 가입 - 성공")
    public void create_capital_success() throws Exception {
        // given
        long capitalAmounts = 1000000;
        long capitalPeriod = 10;
        CapitalRequest capitalRequest = CapitalRequest.builder()
                .capitalAmounts(capitalAmounts)
                .capitalPeriod(capitalPeriod)
                .build();
        String content = gson.toJson(capitalRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/capital")
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
                        document("사채 가입",
                                ResourceSnippetParameters.builder()
                                        .tag("사채")
                                        .summary("사채 가입 API")
                                        .description("사채에 가입할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );
    }

    @Test
    @DisplayName("사채 상환 - 성공")
    public void delete_capital_success() throws Exception {
        // given
        long money = 1000000;
        CapitalRepayRequest capitalRepayRequest = CapitalRepayRequest.builder()
                .money(money)
                .build();
        String content = gson.toJson(capitalRepayRequest);

        // when
        ResultActions postActions = mockMvc.perform(
                post("/api/v1/capital")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        ResultActions actions = mockMvc.perform(
                patch("/api/v1/capital")
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
                        document("사채 상환",
                                ResourceSnippetParameters.builder()
                                        .tag("사채")
                                        .summary("사채 상환 API")
                                        .description("사채를 상환할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );
    }
}