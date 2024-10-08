package com.zzf.backend.domain.home.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.google.gson.Gson;
import com.zzf.backend.domain.capital.dto.CapitalRequest;
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
    @DisplayName("내 예적금 조회 - 성공")
    public void my_deposit_savings_success() throws Exception {
        //given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/home/my-deposit-savings")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("내 예적금 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("집")
                                        .summary("내 예적금 조회 API")
                                        .description("집에서 내 예적금 목록을 조회하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.totalMoney").type(JsonFieldType.NUMBER).description("예적금 전체 금액"),
                                        fieldWithPath("body.myDepositResponseList[]").type(JsonFieldType.ARRAY).description("예금 리스트"),
                                        fieldWithPath("body.myDepositResponseList[].depositId").type(JsonFieldType.NUMBER).description("예금 ID"),
                                        fieldWithPath("body.myDepositResponseList[].name").type(JsonFieldType.STRING).description("예금 상품 이름"),
                                        fieldWithPath("body.myDepositResponseList[].period").type(JsonFieldType.NUMBER).description("예금 기간"),
                                        fieldWithPath("body.myDepositResponseList[].amount").type(JsonFieldType.NUMBER).description("예치금 금액"),
                                        fieldWithPath("body.myDepositResponseList[].rate").type(JsonFieldType.NUMBER).description("예금 이자율"),
                                        fieldWithPath("body.myDepositResponseList[].finalReturn").type(JsonFieldType.NUMBER).description("이자 포함 만기시 금액"),
                                        fieldWithPath("body.myDepositResponseList[].deleteReturn").type(JsonFieldType.NUMBER).description("해지시 반환 금액"),
                                        fieldWithPath("body.myDepositResponseList[].restTurn").type(JsonFieldType.NUMBER).description("만기까지 남은 턴"),
                                        fieldWithPath("body.myDepositResponseList[].endTurn").type(JsonFieldType.NUMBER).description("만기 턴"),
                                        fieldWithPath("body.myDepositResponseList[].depositImgUrl").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("body.mySavingsResponseList[]").type(JsonFieldType.ARRAY).description("적금 리스트"),
                                        fieldWithPath("body.mySavingsResponseList[].savingsId").type(JsonFieldType.NUMBER).description("적금 ID"),
                                        fieldWithPath("body.mySavingsResponseList[].name").type(JsonFieldType.STRING).description("적금 상품 이름"),
                                        fieldWithPath("body.mySavingsResponseList[].period").type(JsonFieldType.NUMBER).description("적금 기간"),
                                        fieldWithPath("body.mySavingsResponseList[].amount").type(JsonFieldType.NUMBER).description("지금까지 낸 금액"),
                                        fieldWithPath("body.mySavingsResponseList[].rate").type(JsonFieldType.NUMBER).description("적금 이자율"),
                                        fieldWithPath("body.mySavingsResponseList[].payment").type(JsonFieldType.NUMBER).description("매 달 내야하는 금액"),
                                        fieldWithPath("body.mySavingsResponseList[].finalReturn").type(JsonFieldType.NUMBER).description("이자 포함 만기시 금액"),
                                        fieldWithPath("body.mySavingsResponseList[].deleteReturn").type(JsonFieldType.NUMBER).description("해지시 반환 금액"),
                                        fieldWithPath("body.mySavingsResponseList[].restTurn").type(JsonFieldType.NUMBER).description("만기까지 남은 턴"),
                                        fieldWithPath("body.mySavingsResponseList[].endTurn").type(JsonFieldType.NUMBER).description("만기 턴"),
                                        fieldWithPath("body.mySavingsResponseList[].warning").type(JsonFieldType.BOOLEAN).description("경고 여부"),
                                        fieldWithPath("body.mySavingsResponseList[].savingsImgUrl").type(JsonFieldType.STRING).description("이미지 주소")
                                )
                ));
    }

    @Test
    @DisplayName("내 사채 조회 - 성공")
    public void my_capital_success() throws Exception {
        // given
        long capitalAmounts = 1000000;
        long capitalPeriod = 10;
        CapitalRequest capitalRequest = CapitalRequest.builder()
                .capitalAmounts(capitalAmounts)
                .capitalPeriod(capitalPeriod)
                .build();
        String content = gson.toJson(capitalRequest);

        mockMvc.perform(
                post("/api/v1/capital")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        ).andExpect(status().isOk());

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/home/capital")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(READ_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(READ_SUCCESS.getMessage()))
                .andDo(
                        document("내 사채 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("집")
                                        .summary("내 사채 조회 API")
                                        .description("내 사채를 조회할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.capitalOrigin").type(JsonFieldType.NUMBER).description("대출 원금"),
                                        fieldWithPath("body.capitalEndTurn").type(JsonFieldType.NUMBER).description("대출 상환일"),
                                        fieldWithPath("body.capitalRestTurn").type(JsonFieldType.NUMBER).description("대출 남은 기간"),
                                        fieldWithPath("body.capitalRestMoney").type(JsonFieldType.NUMBER).description("남은 금액")
                                        )
                        )
                );
    }

    @Test
    @DisplayName("다음날로 넘어가기 - 성공")
    public void next_turn_success() throws Exception {
        // given

        //when
        ResultActions actions = mockMvc.perform(
                patch("/api/v1/home/next")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(UPDATE_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(UPDATE_SUCCESS.getMessage()))
                        .andDo(
                                document("다음날로 넘어가기",
                                        ResourceSnippetParameters.builder()
                                                .tag("집")
                                                .summary("다음날로 넘어가기 API")
                                                .description("다음날로 넘어갈때 사용하는 API"),
                                        responseFields(
                                                fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                                fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                                fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                        )
                                )
                        );
    }

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