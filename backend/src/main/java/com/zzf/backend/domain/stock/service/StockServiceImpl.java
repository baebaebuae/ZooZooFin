package com.zzf.backend.domain.stock.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.domain.stock.dto.*;
import com.zzf.backend.domain.stock.entity.*;
import com.zzf.backend.domain.stock.repository.*;
import com.zzf.backend.global.exception.CustomException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final AnimalRepository animalRepository;
    private final ChartRepository chartRepository;
    private final ExchangeRepository exchangeRepository;
    private final StockRepository stockRepository;
    private final StockHoldingsRepository stockHoldingsRepository;
    private final FinancialStatementsRepository financialRepository;
    private final CreationUnitRepository creationUnitRepository;
    private final NewsRepository newsRepository;
    private final StockHistoryRepository stockHistoryRepository;
    private final TurnRecordRepository turnRecordRepository;

    @Value("${ai-server.uri}")
    private String aiServerUri;

    @Value("${ai-server.path}")
    private String aiServerPath;

    @Override
    public GetHoldingsResponse getHoldings(Long animalId, String stockType) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        String type = switch (stockType) {
            case "domestic" -> "국내";
            case "oversea" -> "해외";
            case "etf" -> "ETF";
            default -> throw new CustomException(STOCK_TYPE_NOT_FOUND_EXCEPTION);
        };


        List<StockHoldings> stockHoldings = stockHoldingsRepository
                .findAllByStockStockTypeAndAnimalAndStockIsSoldFalse(type, animal);

        Long totalAmount = stockHoldings.stream().map(holdings -> {
                    Stock stock = holdings.getStock();

                    Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                            .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

                    return holdings.getStockCount() * chart.getPrice();
                })
                .reduce(0L, Long::sum);

        Double totalInvestment = stockHoldings.stream().map(
                        holdings -> holdings.getStockAveragePrice() * holdings.getStockCount())
                .reduce(0.0, Double::sum);

        Double totalProfit = totalInvestment - totalAmount;

        if (stockType.equals("oversea")) {
            Exchange exchange = exchangeRepository.findByTurn(animal.getTurn())
                    .orElseThrow(() -> new CustomException(EXCHANGE_NOT_FOUND_EXCEPTION));
            return GetHoldingsResponse.builder()
                    .totalAmount(totalAmount)
                    .totalInvestment(totalInvestment)
                    .totalProfit(totalProfit)
                    .exchange(exchange.getExchange())
                    .exchangeRate(exchange.getExchangeRate())
                    .holdingsList(stockHoldings.stream()
                            .map(holdings -> {
                                Chart chart = chartRepository.findByStockAndTurn(holdings.getStock(), animal.getTurn())
                                        .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

                                double stockRate = getStockRate(holdings.getStockAveragePrice(), chart.getPrice());
                                Long stockPrice = chart.getPrice() * exchange.getExchange();
                                Long stockTotal = stockPrice * holdings.getStockCount();

                                return GetHoldingsResponse.Holdings.builder()
                                        .stockId(holdings.getStock().getStockId())
                                        .stockField(holdings.getStock().getStockField())
                                        .stockName(holdings.getStock().getStockName())
                                        .stockRate(stockRate)
                                        .stockTotal(stockTotal)
                                        .stockPrice(stockPrice)
                                        .stockCount(holdings.getStockCount())
                                        .build();
                            })
                            .collect(Collectors.toList()))
                    .build();
        } else {
            return GetHoldingsResponse.builder()
                    .totalAmount(totalAmount)
                    .totalInvestment(totalInvestment)
                    .totalProfit(totalProfit)
                    .holdingsList(stockHoldings.stream()
                            .map(holdings -> {
                                Chart chart = chartRepository.findByStockAndTurn(holdings.getStock(), animal.getTurn())
                                        .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

                                double stockRate = getStockRate(holdings.getStockAveragePrice(), chart.getPrice());
                                Long stockPrice = chart.getPrice();
                                Long stockTotal = stockPrice * holdings.getStockCount();

                                return GetHoldingsResponse.Holdings.builder()
                                        .stockId(holdings.getStock().getStockId())
                                        .stockField(holdings.getStock().getStockField())
                                        .stockName(holdings.getStock().getStockName())
                                        .stockRate(stockRate)
                                        .stockTotal(stockTotal)
                                        .stockPrice(stockPrice)
                                        .stockCount(holdings.getStockCount())
                                        .build();
                            })
                            .collect(Collectors.toList()))
                    .build();
        }
    }

    @Override
    public StockListResponse getStockList(Long animalId, String stockType) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        List<Stock> stockList = switch (stockType) {
            case "domestic" -> stockRepository.findAllByStockType("국내");
            case "oversea" -> stockRepository.findAllByStockType("해외");
            case "etf" -> stockRepository.findAllByStockType("ETF");
            default -> throw new CustomException(STOCK_TYPE_NOT_FOUND_EXCEPTION);
        };

        if (stockType.equals("oversea")) {
            Exchange exchange = exchangeRepository.findByTurn(animal.getTurn())
                    .orElseThrow(() -> new CustomException(EXCHANGE_NOT_FOUND_EXCEPTION));
            return StockListResponse.builder()
                    .exchange(exchange.getExchange())
                    .exchangeRate(exchange.getExchangeRate())
                    .stockDetails(stockList.stream()
                            .map(stock -> {
                                Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                                        .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));
                                return StockListResponse.StockDetails.builder()
                                        .stockId(stock.getStockId())
                                        .stockName(stock.getStockName())
                                        .stockField(stock.getStockField())
                                        .stockIntro(stock.getStockInfo())
                                        .stockImage(stock.getStockImg())
                                        .rate(chart.getRate())
                                        .price(chart.getPrice() * exchange.getExchange())
                                        .build();
                            })
                            .collect(Collectors.toList()))
                    .build();

        } else {
            return StockListResponse.builder()
                    .stockDetails(stockList.stream()
                            .map(stock -> {
                                Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                                        .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));
                                return StockListResponse.StockDetails.builder()
                                        .stockId(stock.getStockId())
                                        .stockName(stock.getStockName())
                                        .stockField(stock.getStockField())
                                        .stockIntro(stock.getStockInfo())
                                        .stockImage(stock.getStockImg())
                                        .rate(chart.getRate())
                                        .price(chart.getPrice())
                                        .build();
                            })
                            .collect(Collectors.toList()))
                    .build();

        }
    }

    @Override
    public StockInfoResponse getStockInfo(Long animalId, Long stockId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

        List<Chart> chartList = chartRepository.findAllByStockAndTurnLessThanEqual(stock, animal.getTurn());
        if (chartList.isEmpty()) {
            throw new CustomException(CHART_NOT_FOUND_EXCEPTION);
        }

        List<News> newsList = newsRepository.findAllByStockAndTurn(stock, animal.getTurn());

        return StockInfoResponse.builder()
                .stockId(stock.getStockId())
                .stockName(stock.getStockName())
                .stockIntro(stock.getStockInfo())
                .chart(chartList.stream()
                        .map(StockInfoResponse::getChartInfo)
                        .collect(Collectors.toList()))
                .news(newsList.stream()
                        .map(StockInfoResponse::getNewsInfo)
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public StockDetailResponse getStockDetail(Long animalId, Long stockId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));
        if (stock.getStockType().equals("ETF")) {
            throw new CustomException(STOCK_TYPE_NOT_ALLOWED_EXCEPTION);
        }


        List<Chart> chartList = chartRepository.findAllByStockAndTurnLessThanEqual(stock, animal.getTurn());
        if (chartList.isEmpty()) {
            throw new CustomException(CHART_NOT_FOUND_EXCEPTION);
        }

        Long period = animal.getTurn() <= 25 ? 1L : 2L;

        FinancialStatements fs = financialRepository.findByStockAndPeriod(stock, period)
                .orElseThrow(() -> new CustomException(FINANCIAL_STATEMENTS_NOT_FOUND));


        return StockDetailResponse.builder()
                .stockName(stock.getStockName())
                .period(period)
                .revenue(fs.getRevenue())
                .marketCap(fs.getMarketCap())
                .dividendYield(fs.getDividendYield())
                .PBR(fs.getPBR())
                .PER(fs.getPER())
                .ROE(fs.getROE())
                .PSR(fs.getPSR())
                .chartDetail(chartList.stream()
                        .map(StockDetailResponse::getChartDetail)
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public CreationUnitResponse getCreationUnit(Long animalId, Long stockId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));
        if (!stock.getStockType().equals("ETF")) {
            throw new CustomException(STOCK_TYPE_NOT_ALLOWED_EXCEPTION);
        }

        List<Chart> chartList = chartRepository.findAllByStockAndTurnLessThanEqual(stock, animal.getTurn());
        if (chartList.isEmpty()) {
            throw new CustomException(CHART_NOT_FOUND_EXCEPTION);
        }

        List<CreationUnit> creationUnitList = creationUnitRepository.findAllByStockOrderByElemPercentageDesc(stock);
        if (creationUnitList.isEmpty()) {
            throw new CustomException(CREATION_UNIT_NOT_FOUND_EXCEPTION);
        }

        if (creationUnitList.size() > 10) {
            double sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += creationUnitList.get(i).getElemPercentage();
            }
            creationUnitList = creationUnitList.subList(0, 10);
            creationUnitList.add(CreationUnit.builder()
                    .elemName("기타")
                    .elemPercentage(sum)
                    .build());
        }

        return CreationUnitResponse.builder()
                .elements(creationUnitList.stream()
                        .map(cu -> CreationUnitResponse.Element.builder()
                                .name(cu.getElemName())
                                .percentage(cu.getElemPercentage())
                                .build())
                        .collect(Collectors.toList()))
                .chartDetail(chartList.stream()
                        .map(CreationUnitResponse::getChartDetail)
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public StockHintResponse getStockHint(Long animalId, Long stockId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

        List<Chart> chartList = chartRepository.findTop5ByStockAndTurnLessThanEqualOrderByTurnDesc(stock, animal.getTurn());
        if (chartList.size() != 5) {
            throw new CustomException(CHART_NOT_FOUND_EXCEPTION);
        }

        List<News> newsList = newsRepository.findAllByStockAndTurn(stock, animal.getTurn());
        if (newsList.isEmpty()) {
            throw new CustomException(NEWS_NOT_FOUND);
        }

        News news = newsList.getFirst();

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("industry_field", switch (stock.getStockField()) {
            case "제조" -> "manufacturing";
            case "IT" -> "it";
            case "엔터" -> "entertainment";
            case "바이오" -> "bio";
            case "식품" -> "food";
            case "화학" -> "chemical";
            case "금융" -> "finance";
            case "반도체" -> "semiconductor";
            default -> throw new CustomException(STOCK_TYPE_NOT_ALLOWED_EXCEPTION);
        });
        formData.add("stock_field", stock.getStockType());
        formData.add("stock_code", stock.getStockCode());
        formData.add("input_date", news.getDate().toString());
        formData.add("news_data", news.getContent());

        AiOutputDto aiOutput = WebClient.create(aiServerUri)
                .post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .path(aiServerPath)
                        .build(true)
                )
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError,
                        clientResponse -> Mono.error(new CustomException(AI_SERVER_ERROR)))
                .onStatus(HttpStatusCode::is5xxServerError,
                        clientResponse -> Mono.error(new CustomException(AI_SERVER_ERROR)))
                .bodyToMono(AiOutputDto.class)
                .block();

        return StockHintResponse.builder()
                .newsTitle(news.getTitle())
                .negativeRatio(aiOutput.getNegativeRatio())
                .neutralRatio(aiOutput.getNeutralRatio())
                .positiveRatio(aiOutput.getPositiveRatio())
                .negativeSentences(aiOutput.getNegativeSentences().stream()
                        .map(ns -> StockHintResponse.Sentence.builder()
                                .score(ns.getScore())
                                .sentence(ns.getSentence())
                                .build()
                        ).collect(Collectors.toList()))
                .positiveSentences(aiOutput.getPositiveSentences().stream()
                        .map(ps -> StockHintResponse.Sentence.builder()
                                .score(ps.getScore())
                                .sentence(ps.getSentence())
                                .build())
                        .collect(Collectors.toList()))
                .predictedPrice(aiOutput.getPredictedPrice())
                .summary(aiOutput.getSummary())
                .price(chartList.stream()
                        .map(Chart::getPrice)
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public NotebookStockListResponse getStockListNotebook(Long animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        Exchange exchange = exchangeRepository.findByTurn(animal.getTurn())
                .orElseThrow(() -> new CustomException(EXCHANGE_NOT_FOUND_EXCEPTION));

        List<StockHoldings> stockHoldings = stockHoldingsRepository.findAllByAnimalAndStockIsSoldFalse(animal);


        List<NotebookStockListResponse.NotebookStock> domesticList = new ArrayList<>();
        List<NotebookStockListResponse.NotebookStock> overseaList = new ArrayList<>();
        List<NotebookStockListResponse.NotebookStock> etfList = new ArrayList<>();

        long totalAmount = 0;
        for (StockHoldings stockHolding : stockHoldings) {
            Chart chart = chartRepository.findByStockAndTurn(stockHolding.getStock(), animal.getTurn())
                    .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));
            totalAmount += stockHolding.getStockCount() * chart.getPrice();

            switch (stockHolding.getStock().getStockType()) {
                case "국내" -> domesticList.add(NotebookStockListResponse.NotebookStock.builder()
                        .stockId(stockHolding.getStock().getStockId())
                        .stockName(stockHolding.getStock().getStockName())
                        .stockTotal(stockHolding.getStockCount() * chart.getPrice())
                        .stockRate(chart.getRate())
                        .build());
                case "해외" -> overseaList.add(NotebookStockListResponse.NotebookStock.builder()
                        .stockId(stockHolding.getStock().getStockId())
                        .stockName(stockHolding.getStock().getStockName())
                        .stockTotal(stockHolding.getStockCount() * chart.getPrice() * exchange.getExchange())
                        .stockRate(chart.getRate())
                        .build());
                case "ETF" -> etfList.add(NotebookStockListResponse.NotebookStock.builder()
                        .stockId(stockHolding.getStock().getStockId())
                        .stockName(stockHolding.getStock().getStockName())
                        .stockTotal(stockHolding.getStockCount() * chart.getPrice())
                        .stockRate(chart.getRate())
                        .build());
            }
        }

        return NotebookStockListResponse.builder()
                .totalAmount(totalAmount)
                .domesticList(domesticList)
                .overseaList(overseaList)
                .etfList(etfList)
                .build();
    }

    @Override
    public NotebookStockInfoResponse getStockInfoNotebook(Long animalId, Long stockId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

        StockHoldings stockHolding = stockHoldingsRepository.findByStockAndAnimalAndStockIsSoldFalse(stock, animal)
                .orElseThrow(() -> new CustomException(HOLDINGS_NOT_FOUND_EXCEPTION));

        Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

        List<Chart> chartList = chartRepository.findAllByStockAndTurnLessThanEqual(stock, animal.getTurn());

        List<StockHistory> stockHistoryList = stockHistoryRepository.findAllByAnimalAndStockOrderByTurnDesc(animal, stock);
        if (stockHistoryList.isEmpty()) {
            throw new CustomException(STOCK_HISTORY_NOT_FOUND);
        }

        if (stock.getStockType().equals("해외")) {
            Exchange exchange = exchangeRepository.findByTurn(animal.getTurn())
                    .orElseThrow(() -> new CustomException(EXCHANGE_NOT_FOUND_EXCEPTION));
            return NotebookStockInfoResponse.builder()
                    .stockName(stock.getStockName())
                    .stockPrice(chart.getPrice() * exchange.getExchange())
                    .stockRate(chart.getRate())
                    .chart(chartList.stream()
                            .map(NotebookStockInfoResponse::getChartInfo)
                            .collect(Collectors.toList()))
                    .stockCount(stockHolding.getStockCount())
                    .buyTurn(stockHistoryList.getFirst().getTurn())
                    .rate(getStockRate(stockHolding.getStockAveragePrice(), chart.getPrice()))
                    .profit((long) (chart.getPrice() - stockHolding.getStockAveragePrice()) * stockHolding.getStockCount() * exchange.getExchange())
                    .stockHistory(stockHistoryList.stream()
                            .map(NotebookStockInfoResponse::getStockHistoryInfo)
                            .collect(Collectors.toList()))
                    .build();
        } else {
            return NotebookStockInfoResponse.builder()
                    .stockName(stock.getStockName())
                    .stockPrice(chart.getPrice())
                    .stockRate(chart.getRate())
                    .chart(chartList.stream()
                            .map(NotebookStockInfoResponse::getChartInfo)
                            .collect(Collectors.toList()))
                    .stockCount(stockHolding.getStockCount())
                    .buyTurn(stockHistoryList.getFirst().getTurn())
                    .rate(getStockRate(stockHolding.getStockAveragePrice(), chart.getPrice()))
                    .profit((long) (chart.getPrice() - stockHolding.getStockAveragePrice()) * stockHolding.getStockCount())
                    .stockHistory(stockHistoryList.stream()
                            .map(NotebookStockInfoResponse::getStockHistoryInfo)
                            .collect(Collectors.toList()))
                    .build();
        }
    }

    @Override
    public void buyStock(Long animalId, BuyStockRequest buyStockRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn())
                .orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));

        Stock stock = stockRepository.findById(buyStockRequest.getStockId())
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

        Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

        Long cost = chart.getPrice() * buyStockRequest.getCount();
        if (stock.getStockType().equals("해외")) {
            Exchange exchange = exchangeRepository.findByTurn(animal.getTurn())
                    .orElseThrow(() -> new CustomException(EXCHANGE_NOT_FOUND_EXCEPTION));
            cost *= exchange.getExchange();
        }

        if (animal.getAssets() < cost) {
            throw new CustomException(LACK_ASSETS_EXCEPTION);
        }


        animal.setAssets(animal.getAssets() - cost);

        turnRecord.setStockBuy(turnRecord.getStockBuy() - cost);

        StockHoldings stockHoldings;
        if (stockHoldingsRepository.existsByStockAndAnimalAndStockIsSoldFalse(stock, animal)) {
            stockHoldings = stockHoldingsRepository.findByStockAndAnimalAndStockIsSoldFalse(stock, animal)
                    .orElseThrow(() -> new CustomException(HOLDINGS_NOT_FOUND_EXCEPTION));

            stockHoldings.setStockAveragePrice(
                    ((stockHoldings.getStockAveragePrice() * stockHoldings.getStockCount())
                            + (chart.getPrice() * buyStockRequest.getCount()))
                            / (stockHoldings.getStockCount() + buyStockRequest.getCount()));
            stockHoldings.setStockCount(stockHoldings.getStockCount() + buyStockRequest.getCount());

        } else {
            stockHoldings = StockHoldings.builder()
                    .stock(stock)
                    .animal(animal)
                    .stockCount(buyStockRequest.getCount())
                    .stockAveragePrice((double) chart.getPrice())
                    .stockIsSold(false)
                    .build();

            stockHoldingsRepository.save(stockHoldings);
        }

        stockHistoryRepository.save(StockHistory.builder()
                .stock(stock)
                .animal(animal)
                .tradeCount(buyStockRequest.getCount())
                .tradeAmount(-cost)
                .isBuy(true)
                .turn(animal.getTurn())
                .build());
    }

    @Override
    public void sellStock(Long animalId, SellStockRequest sellStockRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn())
                .orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));

        Stock stock = stockRepository.findById(sellStockRequest.getStockId())
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

        Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

        StockHoldings stockHoldings = stockHoldingsRepository.findByStockAndAnimalAndStockIsSoldFalse(stock, animal)
                .orElseThrow(() -> new CustomException(HOLDINGS_NOT_FOUND_EXCEPTION));

        if (stockHoldings.getStockCount() < sellStockRequest.getCount()) {
            throw new CustomException(LACK_STOCK_EXCEPTION);
        }

        Long cost = chart.getPrice() * sellStockRequest.getCount();
        if (stock.getStockType().equals("해외")) {
            Exchange exchange = exchangeRepository.findByTurn(animal.getTurn())
                    .orElseThrow(() -> new CustomException(EXCHANGE_NOT_FOUND_EXCEPTION));
            cost *= exchange.getExchange();
        }

        animal.setAssets(animal.getAssets() + cost);

        turnRecord.setStockSell(turnRecord.getStockSell() + cost);

        stockHoldings.setStockCount(stockHoldings.getStockCount() - sellStockRequest.getCount());

        if (stockHoldings.getStockCount() == 0) {
            stockHoldings.setStockIsSold(true);
        }

        stockHistoryRepository.save(StockHistory.builder()
                .stock(stock)
                .animal(animal)
                .tradeCount(sellStockRequest.getCount())
                .tradeAmount(cost)
                .isBuy(false)
                .turn(animal.getTurn())
                .build());
    }

    private static double getStockRate(Double before, Long after) {
        return ((double) after - before) / before * 100;
    }

}
