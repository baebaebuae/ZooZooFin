package com.zzf.backend.domain.loan.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.google.gson.Gson;
import com.zzf.backend.domain.deposit.dto.DepositDeleteRequest;
import com.zzf.backend.domain.loan.dto.LoanDeleteRequest;
import com.zzf.backend.domain.loan.dto.LoanRequest;
import com.zzf.backend.domain.stock.dto.BuyStockRequest;
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
class LoanControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("대출 가능 여부 조회 - 성공")
    public void loan_available_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/loan/check")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("대출 가능 여부 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("대출")
                                        .summary("대출 가능 여부 조회 API")
                                        .description("대출 가능 여부를 조회할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.characterCredit").type(JsonFieldType.NUMBER).description("신용도"),
                                        fieldWithPath("body.isAvailable").type(JsonFieldType.BOOLEAN).description("대출 가능 여부"),
                                        fieldWithPath("body.loanRate").type(JsonFieldType.NUMBER).description("이율"),
                                        fieldWithPath("body.loanLimit").type(JsonFieldType.NUMBER).description("대출 한도"),
                                        fieldWithPath("body.loanAvailable").type(JsonFieldType.NUMBER).description("잔여 대출 가능 금액")
                                )
                        )
                );
    }

    @Test
    @DisplayName("대출 가입 - 성공")
    public void create_loan_success() throws Exception {
        // given
        long loanType = 1;
        long loanAmounts = 1000000;
        long loanPeriod = 10;
        LoanRequest loanRequest = LoanRequest.builder()
                .loanType(loanType)
                .loanAmounts(loanAmounts)
                .loanPeriod(loanPeriod)
                .build();
        String content = gson.toJson(loanRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/loan")
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
                        document("대출 가입",
                                ResourceSnippetParameters.builder()
                                        .tag("대출")
                                        .summary("대출 가입 API")
                                        .description("대출 가입 시 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );

    }

    @Test
    @DisplayName("나의 대출 조회 - 성공")
    public void my_loan_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/loan/my")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("나의 대출 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("대출")
                                        .summary("나의 대출 조회 API")
                                        .description("현재 나의 갚지않은 대출 상품을 조회할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.totalLoan").type(JsonFieldType.NUMBER).description("총 대출 원금"),
                                        fieldWithPath("body.restLoan").type(JsonFieldType.NUMBER).description("남은 원금"),
                                        fieldWithPath("body.myLoanList[]").type(JsonFieldType.ARRAY).description("대출 리스트"),
                                        fieldWithPath("body.myLoanList[].loanId").type(JsonFieldType.NUMBER).description("대출 ID"),
                                        fieldWithPath("body.myLoanList[].loanNumber").type(JsonFieldType.NUMBER).description("번호"),
                                        fieldWithPath("body.myLoanList[].loanRate").type(JsonFieldType.NUMBER).description("금리"),
                                        fieldWithPath("body.myLoanList[].payBackTurn").type(JsonFieldType.NUMBER).description("현재 턴"),
                                        fieldWithPath("body.myLoanList[].loanPeriod").type(JsonFieldType.NUMBER).description("기간"),
                                        fieldWithPath("body.myLoanList[].loanAmount").type(JsonFieldType.NUMBER).description("원금"),
                                        fieldWithPath("body.myLoanList[].loanRemain").type(JsonFieldType.NUMBER).description("남은 상환 금액"),
                                        fieldWithPath("body.myLoanList[].loanType").type(JsonFieldType.NUMBER).description("상환 방식"),
                                        fieldWithPath("body.myLoanList[].warning").type(JsonFieldType.BOOLEAN).description("경고 여부")
                                )
                        )
                );
    }

    @Test
    @DisplayName("대출 상환 - 성공")
    public void delete_deposit_success() throws Exception {
        // given
        long loanId = 10000;
        LoanDeleteRequest loanDeleteRequest = LoanDeleteRequest.builder()
                .loanId(loanId)
                .build();
        String content = gson.toJson(loanDeleteRequest);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/api/v1/loan/my")
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
                        document("대출 상환",
                                ResourceSnippetParameters.builder()
                                        .tag("대출")
                                        .summary("대출 상환 API")
                                        .description("대출을 상환할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );
    }
}