package com.zzf.backend.domain.home.controller;

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
class HomeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("오늘 거래 내역 조회 - 성공")
    public void turn_record_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/home/turn-record")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("오늘 거래 내역 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("집")
                                        .summary("오늘 거래 내역 조회 API")
                                        .description("집에서 오늘 거래 내역을 확인할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.dailyCharge").type(JsonFieldType.NUMBER).description("근무수당"),
                                        fieldWithPath("body.loanMake").type(JsonFieldType.NUMBER).description("은행대출"),
                                        fieldWithPath("body.loanRepay").type(JsonFieldType.NUMBER).description("은행대출이자"),
                                        fieldWithPath("body.stockBuy").type(JsonFieldType.NUMBER).description("주식 매수"),
                                        fieldWithPath("body.stockSell").type(JsonFieldType.NUMBER).description("주식 매도"),
                                        fieldWithPath("body.depositMake").type(JsonFieldType.NUMBER).description("예금"),
                                        fieldWithPath("body.depositFinish").type(JsonFieldType.NUMBER).description("예금만기"),
                                        fieldWithPath("body.savingsMake").type(JsonFieldType.NUMBER).description("적금"),
                                        // TODO: 이건 모지
                                        fieldWithPath("body.savingsPay").type(JsonFieldType.NUMBER).description("적금"),
                                        fieldWithPath("body.savingsFinish").type(JsonFieldType.NUMBER).description("적금만기"),
                                        fieldWithPath("body.capitalMake").type(JsonFieldType.NUMBER).description("캐피탈 대출"),
                                        fieldWithPath("body.capitalRepay").type(JsonFieldType.NUMBER).description("캐피탈 원금 상환")
                                )
                        )
                );
    }

    @Test
    @DisplayName("고지서 조회 - 성공")
    public void warning_record_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/home/warning-record")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("고지서 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("집")
                                        .summary("고지서 조회 API")
                                        .description("고지서 세부 내용을 확인할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.warningSavingsCount").type(JsonFieldType.NUMBER).description("적금 연체 횟수"),
                                        fieldWithPath("body.warningLoanCount").type(JsonFieldType.NUMBER).description("대출 연체 횟수"),
                                        fieldWithPath("body.depositTotal").type(JsonFieldType.NUMBER).description("예금 현금화 총액"),
                                        fieldWithPath("body.depositRepay").type(JsonFieldType.NUMBER).description("예금 상환 금액"),
                                        fieldWithPath("body.savingsTotal").type(JsonFieldType.NUMBER).description("적금 현금화 초액"),
                                        fieldWithPath("body.savingsRepay").type(JsonFieldType.NUMBER).description("적금 상환 금액"),
                                        fieldWithPath("body.stockTotal").type(JsonFieldType.NUMBER).description("주식 현금화 총액"),
                                        fieldWithPath("body.stockRepay").type(JsonFieldType.NUMBER).description("주식 상환 금액")
                                )
                        )
                );
    }

    @Test
    @DisplayName("내일 빠져나갈 돈 조회 - 성공")
    public void next_turn_record_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/home/next-turn-record")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("내일 빠져나갈 돈 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("집")
                                        .summary("내일 빠져나갈 돈 조회 API")
                                        .description("집에서 내일 빠져나갈 돈을 확인할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.nextSavingsRepayment").type(JsonFieldType.NUMBER).description("적금"),
                                        fieldWithPath("body.nextLoanRepayment").type(JsonFieldType.NUMBER).description("은행대출이자"),
                                        fieldWithPath("body.nextCapitalRepayment").type(JsonFieldType.NUMBER).description("캐피탈대출이자")
                                )
                        )
                );
    }

}