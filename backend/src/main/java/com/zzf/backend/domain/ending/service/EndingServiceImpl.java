package com.zzf.backend.domain.ending.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.domain.ending.dto.EndingRequest;
import com.zzf.backend.domain.ending.status.EndingStatus;
import com.zzf.backend.domain.portfolio.status.PortfolioStatus;
import com.zzf.backend.domain.portfolio.entity.Portfolio;
import com.zzf.backend.domain.portfolio.repository.PortfolioRepository;
import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.domain.stock.entity.Chart;
import com.zzf.backend.domain.stock.entity.Stock;
import com.zzf.backend.domain.stock.entity.StockHoldings;
import com.zzf.backend.domain.stock.repository.ChartRepository;
import com.zzf.backend.domain.stock.repository.StockHoldingsRepository;
import com.zzf.backend.domain.stock.repository.StockRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class EndingServiceImpl implements EndingService {

    private final AnimalRepository animalRepository;
    private final PortfolioRepository portfolioRepository;
    private final DepositRepository depositRepository;
    private final SavingsRepository savingsRepository;
    private final StockHoldingsRepository stockHoldingsRepository;
    private final ChartRepository chartRepository;
    private final StockRepository stockRepository;

    @Override
    public void createEnding(Long animalId, EndingRequest endingRequest) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (portfolioRepository.existsByAnimal(animal)) {
            throw new CustomException(PORTFOLIO_ALREADY_EXIST_EXCEPTION);
        }


        EndingStatus endingStatus = EndingStatus.getEndingStatus(endingRequest.endingType());

        List<Deposit> deposit = depositRepository.findAllByAnimalAndDepositEndTurn(animal, animal.getTurn());
        Long depositTotal = deposit.stream()
                .map(Deposit::getDepositAmount)
                .reduce(0L, Long::sum);

        List<Savings> savings = savingsRepository.findAllByAnimalAndSavingsEndTurn(animal, animal.getTurn());
        Long savingsTotal = savings.stream()
                .map(Savings::getSavingsAmount)
                .reduce(0L, Long::sum);

        List<StockHoldings> stockHoldings = stockHoldingsRepository.findAllByAnimalAndStockIsSoldFalse(animal);
        Long stockTotal = stockHoldings.stream().map(holdings -> {
            Stock stock = stockRepository.findById(holdings.getStock().getStockId())
                    .orElseThrow(() -> new CustomException(STOCK_NOT_FOUND_EXCEPTION));
            Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                    .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));
            return chart.getPrice();

        }).reduce(0L, Long::sum);


        long score = 0L;
        score += animal.getAssets();
        score += depositTotal;
        score += savingsTotal;
        score += stockTotal;


        double depositPercent = (double) depositTotal / score;
        double savingsPercent = (double) savingsTotal / score;
        double stockPercent = (double) stockTotal / score;

        PortfolioStatus investStyle = PortfolioStatus.getInvestStyle(stockPercent);

        portfolioRepository.save(Portfolio.builder()
                .animal(animal)
                .portfolioEnding(endingStatus.getEndingCode())
                .portfolioDepositPercent(depositPercent)
                .portfolioSavingsPercent(savingsPercent)
                .portfolioStockPercent(stockPercent)
                .portfolioInvestStyle(investStyle.getInvestStyle())
                .portfolioScore(score)
                .build());
    }
}
