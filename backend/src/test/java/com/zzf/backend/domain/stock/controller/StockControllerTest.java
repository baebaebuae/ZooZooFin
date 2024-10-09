package com.zzf.backend.domain.stock.controller;

import com.epages.restdocs.apispec.ResourceSnippetParameters;
import com.google.gson.Gson;
import com.zzf.backend.domain.stock.dto.BuyStockRequest;
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
class StockControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    private final String token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6ImI2MGU4Y2JjLTljMjAtNGY1My1iZjY4LWNmZWFmMjg1ZDNkNSIsImV4cCI6MTgxNDY0MDgzNX0.-m9wnI1dqig8v2ibj1-975jX7mhK8t0goa_PNrkjK8U";

    @Test
    @DisplayName("보유 주식 조회 - 성공")
    public void stock_holdings_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/{stockType}", "domestic")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        ResultActions actions1 = mockMvc.perform(
                get("/api/v1/stock/{stockType}", "oversea")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        ResultActions actions2 = mockMvc.perform(
                get("/api/v1/stock/{stockType}", "etf")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions1
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(GET_HOLDINGS_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(GET_HOLDINGS_SUCCESS.getMessage()));

        actions2
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(GET_HOLDINGS_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(GET_HOLDINGS_SUCCESS.getMessage()));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(GET_HOLDINGS_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(GET_HOLDINGS_SUCCESS.getMessage()))
                .andDo(
                        document("보유 주식 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("주식")
                                        .summary("보유 주식 조회 API")
                                        .description("보유한 주식을 종류별로 조회할때 사용하는 API<br>국내: domestic<br>해외: oversea<br>ETF: etf"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.totalAmount").type(JsonFieldType.NUMBER).description("총액"),
                                        fieldWithPath("body.totalInvestment").type(JsonFieldType.NUMBER).description("총 투자액"),
                                        fieldWithPath("body.totalProfit").type(JsonFieldType.NUMBER).description("이율"),
                                        fieldWithPath("body.holdingsList[]").type(JsonFieldType.ARRAY).description("보유 주식 리스트"),
                                        fieldWithPath("body.holdingsList[].stockId").type(JsonFieldType.NUMBER).description("주식 ID"),
                                        fieldWithPath("body.holdingsList[].stockField").type(JsonFieldType.STRING).description("분야"),
                                        fieldWithPath("body.holdingsList[].stockName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.holdingsList[].stockRate").type(JsonFieldType.NUMBER).description("상승률"),
                                        fieldWithPath("body.holdingsList[].stockTotal").type(JsonFieldType.NUMBER).description("총액"),
                                        fieldWithPath("body.holdingsList[].stockPrice").type(JsonFieldType.NUMBER).description("개당 가격"),
                                        fieldWithPath("body.holdingsList[].stockCount").type(JsonFieldType.NUMBER).description("개수")
                                )
                        )
                );

    }

    @Test
    @DisplayName("보유 주식 조회 - 존재하지 않는 타입")
    public void stock_holdings_type_not_found() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/{stockType}", "incorrect")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_TYPE_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_TYPE_NOT_FOUND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("전체 주식 리스트 조회 - 성공")
    public void stock_list_success() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/list/{stockType}", "domestic")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        ResultActions actions1 = mockMvc.perform(
                get("/api/v1/stock/list/{stockType}", "oversea")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        ResultActions actions2 = mockMvc.perform(
                get("/api/v1/stock/list/{stockType}", "etf")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions1
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(GET_STOCK_LIST_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(GET_STOCK_LIST_SUCCESS.getMessage()));

        actions2
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(GET_STOCK_LIST_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(GET_STOCK_LIST_SUCCESS.getMessage()));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(GET_STOCK_LIST_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(GET_STOCK_LIST_SUCCESS.getMessage()))
                .andDo(
                        document("전체 주식 리스트 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("주식")
                                        .summary("전체 주식 리스트 조회 API")
                                        .description("전체 주식 리스트를 조회할때 사용하는 API<br>국내: domestic<br>해외: oversea<br>ETF: etf"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.stockDetails[]").type(JsonFieldType.ARRAY).description("주식 리스트"),
                                        fieldWithPath("body.stockDetails[].stockId").type(JsonFieldType.NUMBER).description("주식 ID"),
                                        fieldWithPath("body.stockDetails[].stockName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.stockDetails[].stockField").type(JsonFieldType.STRING).description("분류"),
                                        fieldWithPath("body.stockDetails[].stockIntro").type(JsonFieldType.STRING).description("간단 소개"),
                                        fieldWithPath("body.stockDetails[].stockImage").type(JsonFieldType.STRING).description("이미지"),
                                        fieldWithPath("body.stockDetails[].rate").type(JsonFieldType.NUMBER).description("상승률")
                                )
                        )
                );

    }

    @Test
    @DisplayName("전체 주식 리스트 조회 - 존재하지 않는 타입")
    public void stock_list_type_not_found() throws Exception {
        // given

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/list/{stockType}", "incorrect")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_TYPE_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_TYPE_NOT_FOUND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("주식 정보 조회 - 성공")
    public void stock_info_success() throws Exception {
        // given
        long stockId = 10000;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/info/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_INFO_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_INFO_SUCCESS.getMessage()))
                .andDo(
                        document("주식 정보 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("주식")
                                        .summary("주식 정보 조회 API")
                                        .description("리스트에서 주식을 눌렀을때 바로 보이는 정보를 위한 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.stockName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.chart[]").type(JsonFieldType.ARRAY).description("차트"),
                                        fieldWithPath("body.chart[].rate").type(JsonFieldType.NUMBER).description("등락률"),
                                        fieldWithPath("body.chart[].price").type(JsonFieldType.NUMBER).description("가격"),
                                        fieldWithPath("body.chart[].highPrice").type(JsonFieldType.NUMBER).description("고가"),
                                        fieldWithPath("body.chart[].lowPrice").type(JsonFieldType.NUMBER).description("저가"),
                                        fieldWithPath("body.chart[].startPrice").type(JsonFieldType.NUMBER).description("시가"),
                                        fieldWithPath("body.chart[].endPrice").type(JsonFieldType.NUMBER).description("종가"),
                                        fieldWithPath("body.news[]").type(JsonFieldType.ARRAY).description("뉴스"),
                                        fieldWithPath("body.news[].newsId").type(JsonFieldType.NUMBER).description("뉴스 ID"),
                                        fieldWithPath("body.news[].title").type(JsonFieldType.STRING).description("제목"),
                                        fieldWithPath("body.news[].provider").type(JsonFieldType.STRING).description("신문사")
                                )
                        )
                );

    }

    @Test
    @DisplayName("주식 정보 조회 - 존재하지 않는 주식")
    public void stock_info_stock_not_found() throws Exception {
        // given
        long stockId = 20000;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/info/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_NOT_FOUND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("주식 상세정보 조회(국내, 해외) - 성공")
    public void stock_detail_success() throws Exception {
        // given
        long stockId = 10000;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/statements/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_DETAIL_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_DETAIL_SUCCESS.getMessage()))
                .andDo(
                        document("주식 상세정보 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("주식")
                                        .summary("주식 상세정보 조회 API")
                                        .description("재무제표와 이동평균선을 위한 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.stockName").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("body.period").type(JsonFieldType.NUMBER).description("분기"),
                                        fieldWithPath("body.revenue").type(JsonFieldType.NUMBER).description("매출액"),
                                        fieldWithPath("body.marketCap").type(JsonFieldType.NUMBER).description("시가총액"),
                                        fieldWithPath("body.dividendYield").type(JsonFieldType.NUMBER).description("배당수익률"),
                                        fieldWithPath("body.PBR").type(JsonFieldType.NUMBER).description("PBR"),
                                        fieldWithPath("body.PER").type(JsonFieldType.NUMBER).description("PER"),
                                        fieldWithPath("body.ROE").type(JsonFieldType.NUMBER).description("ROE"),
                                        fieldWithPath("body.PSR").type(JsonFieldType.NUMBER).description("PSR"),
                                        fieldWithPath("body.chartDetail[]").type(JsonFieldType.ARRAY).description("차트"),
                                        fieldWithPath("body.chartDetail[].price").type(JsonFieldType.NUMBER).description("가격"),
                                        fieldWithPath("body.chartDetail[].highPrice").type(JsonFieldType.NUMBER).description("고가"),
                                        fieldWithPath("body.chartDetail[].lowPrice").type(JsonFieldType.NUMBER).description("저가"),
                                        fieldWithPath("body.chartDetail[].startPrice").type(JsonFieldType.NUMBER).description("시가"),
                                        fieldWithPath("body.chartDetail[].endPrice").type(JsonFieldType.NUMBER).description("종가")
                                )
                        )
                );

    }

    @Test
    @DisplayName("주식 상세정보 조회(국내, 해외) - ETF")
    public void stock_detail_type_not_allowed() throws Exception {
        // given
        long stockId = 10002;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/statements/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_TYPE_NOT_ALLOWED_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_TYPE_NOT_ALLOWED_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("주식 상세정보 조회(국내, 해외) - 존재하지 않는 주식")
    public void stock_detail_stock_not_found() throws Exception {
        // given
        long stockId = 20000;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/statements/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_NOT_FOUND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("ETF CU 조회 - 성공")
    public void creation_unit_success() throws Exception {
        // given
        long stockId = 10002;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/creation/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(CREATION_UNIT_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(CREATION_UNIT_SUCCESS.getMessage()))
                .andDo(
                        document("ETF CU 조회",
                                ResourceSnippetParameters.builder()
                                        .tag("주식")
                                        .summary("ETF CU 조회 API")
                                        .description("CU와 이동평균선을 위한 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body.elements[]").type(JsonFieldType.ARRAY).description("구성"),
                                        fieldWithPath("body.elements[].name").type(JsonFieldType.STRING).description("회사명"),
                                        fieldWithPath("body.elements[].percentage").type(JsonFieldType.NUMBER).description("지분"),
                                        fieldWithPath("body.chartDetail[]").type(JsonFieldType.ARRAY).description("차트"),
                                        fieldWithPath("body.chartDetail[].price").type(JsonFieldType.NUMBER).description("가격"),
                                        fieldWithPath("body.chartDetail[].highPrice").type(JsonFieldType.NUMBER).description("고가"),
                                        fieldWithPath("body.chartDetail[].lowPrice").type(JsonFieldType.NUMBER).description("저가"),
                                        fieldWithPath("body.chartDetail[].startPrice").type(JsonFieldType.NUMBER).description("시가"),
                                        fieldWithPath("body.chartDetail[].endPrice").type(JsonFieldType.NUMBER).description("종가")
                                )
                        )
                );

    }

    @Test
    @DisplayName("ETF CU 조회 - 존재하지 않는 주식")
    public void creation_unit_stock_not_found() throws Exception {
        // given
        long stockId = 20000;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/creation/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_NOT_FOUND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("ETF CU 조회 - ETF가 아님")
    public void creation_unit_type_not_allowed() throws Exception {
        // given
        long stockId = 10000;

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/stock/creation/{stockId}", stockId)
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_TYPE_NOT_ALLOWED_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_TYPE_NOT_ALLOWED_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("주식 구매 - 성공")
    public void stock_buy_success() throws Exception {
        // given
        long stockId = 10000;
        long count = 1;
        BuyStockRequest buyStockRequest = BuyStockRequest.builder()
                .stockId(stockId)
                .count(count)
                .build();
        String content = gson.toJson(buyStockRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/stock/buy")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(BUY_STOCK_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(BUY_STOCK_SUCCESS.getMessage()))
                .andDo(
                        document("주식 구매",
                                ResourceSnippetParameters.builder()
                                        .tag("주식")
                                        .summary("주식 구매 API")
                                        .description("주식을 구매할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );

    }

    @Test
    @DisplayName("주식 구매 - 존재하지 않는 주식")
    public void stock_buy_stock_not_found() throws Exception {
        // given
        long stockId = 20000;
        long count = 100;
        BuyStockRequest buyStockRequest = BuyStockRequest.builder()
                .stockId(stockId)
                .count(count)
                .build();
        String content = gson.toJson(buyStockRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/stock/buy")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_NOT_FOUND_EXCEPTION.getMessage()));
    }

//    @Test
//    @DisplayName("주식 구매 - 보유 금액 부족")
//    public void stock_buy_lack_stock() throws Exception {
//        // given
//        long stockId = 10000;
//        long count = Long.MAX_VALUE;
//        BuyStockRequest buyStockRequest = BuyStockRequest.builder()
//                .stockId(stockId)
//                .count(count)
//                .build();
//        String content = gson.toJson(buyStockRequest);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                post("/api/v1/stock/buy")
//                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content)
//        );
//
//        // then
//        actions
//                .andExpect(status().isBadRequest())
//                .andExpect(jsonPath("$.httpStatus").value(LACK_ASSETS_EXCEPTION.getHttpStatus()))
//                .andExpect(jsonPath("$.message").value(LACK_ASSETS_EXCEPTION.getMessage()));
//    }

    @Test
    @DisplayName("주식 판매 - 성공")
    public void stock_sell_success() throws Exception {
        // given
        long stockId = 10000;
        long count = 100;
        SellStockRequest sellStockRequest = SellStockRequest.builder()
                .stockId(stockId)
                .count(count)
                .build();
        String content = gson.toJson(sellStockRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/stock/sell")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(SELL_STOCK_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(SELL_STOCK_SUCCESS.getMessage()))
                .andDo(
                        document("주식 판매",
                                ResourceSnippetParameters.builder()
                                        .tag("주식")
                                        .summary("주식 판매 API")
                                        .description("주식을 판매할때 사용하는 API"),
                                responseFields(
                                        fieldWithPath("httpStatus").type(JsonFieldType.NUMBER).description("응답 상태코드"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("응답 메시지"),
                                        fieldWithPath("body").type(JsonFieldType.NULL).description("빈 응답")
                                )
                        )
                );

    }

    @Test
    @DisplayName("주식 판매 - 존재하지 않는 주식")
    public void stock_sell_stock_not_found() throws Exception {
        // given
        long stockId = 20000;
        long count = 100;
        SellStockRequest sellStockRequest = SellStockRequest.builder()
                .stockId(stockId)
                .count(count)
                .build();
        String content = gson.toJson(sellStockRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/stock/sell")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(STOCK_NOT_FOUND_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(STOCK_NOT_FOUND_EXCEPTION.getMessage()));
    }

    @Test
    @DisplayName("주식 판매 - 보유 주식 부족")
    public void stock_sell_lack_stock() throws Exception {
        // given
        long stockId = 10000;
        long count = 101;
        SellStockRequest sellStockRequest = SellStockRequest.builder()
                .stockId(stockId)
                .count(count)
                .build();
        String content = gson.toJson(sellStockRequest);

        // when
        ResultActions actions = mockMvc.perform(
                post("/api/v1/stock/sell")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.httpStatus").value(LACK_STOCK_EXCEPTION.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(LACK_STOCK_EXCEPTION.getMessage()));
    }
}