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
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@Transactional
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    private final AnimalRepository animalRepository;
    private final ChartRepository chartRepository;
    private final StockRepository stockRepository;
    private final StockHoldingsRepository stockHoldingsRepository;
    private final FinancialStatementsRepository financialRepository;
    private final NewsRepository newsRepository;
    private final StockHistoryRepository stockHistoryRepository;
    private final TurnRecordRepository turnRecordRepository;

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

        return StockListResponse.builder()
                .stockDetails(stockList.stream()
                        .map(stock -> StockListResponse.StockDetails.builder()
                                .stockId(stock.getStockId())
                                .stockName(stock.getStockName())
                                .stockField(stock.getStockField())
                                .stockIntro(stock.getStockInfo())
                                .stockImage(stock.getStockImg())
                                .rate(chartRepository.findByStockAndTurn(stock, animal.getTurn())
                                        .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION))
                                        .getRate())
                                .build())
                        .collect(Collectors.toList()))
                .build();
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
                .stockName(stock.getStockName())
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
                .dividedYield(fs.getDividedYield())
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

        if (animal.getAssets() < cost) {
            throw new CustomException(LACK_ASSETS_EXCEPTION);
        }


        animal.setAssets(animal.getAssets() - cost);

        turnRecord.setStockBuy(turnRecord.getStockBuy() - cost);

        StockHoldings stockHoldings;
        if (stockHoldingsRepository.existsByStockAndAnimalAndStockIsSoldFalse(stock, animal)) {
            stockHoldings = stockHoldingsRepository.findByStockAndAnimalAndStockIsSoldFalse(stock, animal)
                    .orElseThrow(() -> new CustomException(HOLDINGS_NOT_FOUND_EXCEPTION));

            stockHoldings.setStockCount(stockHoldings.getStockCount() + buyStockRequest.getCount());
            stockHoldings.setStockAveragePrice(
                    (stockHoldings.getStockAveragePrice() * stockHoldings.getStockCount()
                            + chart.getPrice() * buyStockRequest.getCount())
                            / (stockHoldings.getStockCount() + buyStockRequest.getCount()));

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
                .isBuy(false)
                .turn(animal.getTurn())
                .build());
    }

    private static double getStockRate(Double before, Long after) {
        return ((double) after - before) / before * 100;
    }

}
