package com.zzf.backend.domain.stock.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.domain.stock.dto.BuyStockRequest;
import com.zzf.backend.domain.stock.dto.GetHoldingsResponse;
import com.zzf.backend.domain.stock.dto.SellStockRequest;
import com.zzf.backend.domain.stock.dto.StockListResponse;
import com.zzf.backend.domain.stock.entity.Chart;
import com.zzf.backend.domain.stock.entity.Stock;
import com.zzf.backend.domain.stock.entity.StockHistory;
import com.zzf.backend.domain.stock.entity.StockHoldings;
import com.zzf.backend.domain.stock.repository.*;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
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
                    Stock stock = stockRepository.findById(holdings.getStock().getStockId())
                            .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

                    Chart chart = chartRepository.findByStockAndChartTurn(stock, animal.getAnimalTurn())
                            .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

                    return holdings.getStockCount() * chart.getChartSell();
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
                            Chart chart = chartRepository.findByStockAndChartTurn(holdings.getStock(), animal.getAnimalTurn())
                                    .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

                            double stockRate = getStockRate(holdings.getStockAveragePrice(), chart.getChartSell());
                            Long stockPrice = chart.getChartSell();
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
                                .stockIntro(stock.getStockInfo())
                                .stockImage(stock.getStockImg())
                                .rate(chartRepository.findByStockAndChartTurn(stock, animal.getAnimalTurn())
                                        .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION))
                                        .getChartRate())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    @Override
    public void buyStock(Long animalId, BuyStockRequest buyStockRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getAnimalTurn())
                .orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));

        Stock stock = stockRepository.findById(buyStockRequest.getStockId())
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

        Chart chart = chartRepository.findByStockAndChartTurn(stock, animal.getAnimalTurn())
                .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

        Long cost = chart.getChartSell() * buyStockRequest.getAmount();

        if (animal.getAnimalAssets() < cost) {
            throw new CustomException(LACK_ASSETS_EXCEPTION);
        }


        animal.setAnimalAssets(animal.getAnimalAssets() - cost);

        turnRecord.setStockBuy(cost);

        StockHoldings stockHoldings;
        if (stockHoldingsRepository.existsByStockAndAnimalAndStockIsSoldFalse(stock, animal)) {
            stockHoldings = stockHoldingsRepository.findByStockAndAnimalAndStockIsSoldFalse(stock, animal)
                    .orElseThrow(() -> new CustomException(HOLDINGS_NOT_FOUND_EXCEPTION));

            stockHoldings.setStockCount(stockHoldings.getStockCount() + buyStockRequest.getAmount());
            stockHoldings.setStockAveragePrice(
                    (stockHoldings.getStockAveragePrice() * stockHoldings.getStockCount()
                            + chart.getChartSell() * buyStockRequest.getAmount())
                            / (stockHoldings.getStockCount() + buyStockRequest.getAmount()));

        } else {
            stockHoldings = StockHoldings.builder()
                    .stock(stock)
                    .animal(animal)
                    .stockCount(buyStockRequest.getAmount())
                    .stockAveragePrice((double) chart.getChartSell())
                    .stockIsSold(false)
                    .build();
        }

        animalRepository.save(animal);

        turnRecordRepository.save(turnRecord);

        stockHoldingsRepository.save(stockHoldings);

        stockHistoryRepository.save(StockHistory.builder()
                .stock(stock)
                .animal(animal)
                .tradeCount(buyStockRequest.getAmount())
                .isBuy(true)
                .turn(animal.getAnimalTurn())
                .build());
    }

    @Override
    public void sellStock(Long animalId, SellStockRequest sellStockRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getAnimalTurn())
                .orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));

        Stock stock = stockRepository.findById(sellStockRequest.getStockId())
                .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));

        Chart chart = chartRepository.findByStockAndChartTurn(stock, animal.getAnimalTurn())
                .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

        StockHoldings stockHoldings = stockHoldingsRepository.findByStockAndAnimalAndStockIsSoldFalse(stock, animal)
                .orElseThrow(() -> new CustomException(HOLDINGS_NOT_FOUND_EXCEPTION));

        if (stockHoldings.getStockCount() < sellStockRequest.getAmount()) {
            throw new CustomException(LACK_STOCK_EXCEPTION);
        }


        Long cost = chart.getChartSell() * sellStockRequest.getAmount();

        animal.setAnimalAssets(animal.getAnimalAssets() + cost);

        turnRecord.setStockSell(cost);

        stockHoldings.setStockCount(stockHoldings.getStockCount() - sellStockRequest.getAmount());

        if (stockHoldings.getStockCount() == 0) {
            stockHoldings.setStockIsSold(true);
        }


        animalRepository.save(animal);

        turnRecordRepository.save(turnRecord);

        stockHoldingsRepository.save(stockHoldings);

        stockHistoryRepository.save(StockHistory.builder()
                .stock(stock)
                .animal(animal)
                .tradeCount(sellStockRequest.getAmount())
                .isBuy(false)
                .turn(animal.getAnimalTurn())
                .build());
    }

    private static double getStockRate(Double before, Long after) {
        return ((double) after - before) / before * 100;
    }

}
