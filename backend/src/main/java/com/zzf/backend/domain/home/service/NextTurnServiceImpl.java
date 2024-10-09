package com.zzf.backend.domain.home.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.capital.entity.Capital;
import com.zzf.backend.domain.capital.repository.CapitalRepository;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.domain.home.dto.*;
import com.zzf.backend.domain.home.entity.NextTurnRecord;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.entity.WarningRecord;
import com.zzf.backend.domain.home.repository.NextTurnRecordRepository;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.domain.home.repository.WarningRecordRepository;
import com.zzf.backend.domain.loan.entity.Loan;
import com.zzf.backend.domain.loan.repository.LoanRepository;
import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.savings.entity.SavingsType;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.domain.stock.entity.Chart;
import com.zzf.backend.domain.stock.entity.Stock;
import com.zzf.backend.domain.stock.entity.StockHistory;
import com.zzf.backend.domain.stock.entity.StockHoldings;
import com.zzf.backend.domain.stock.repository.ChartRepository;
import com.zzf.backend.domain.stock.repository.StockHistoryRepository;
import com.zzf.backend.domain.stock.repository.StockHoldingsRepository;
import com.zzf.backend.domain.stock.repository.StockRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class NextTurnServiceImpl implements NextTurnService {

    private final AnimalRepository animalRepository;
    private final DepositRepository depositRepository;
    private final SavingsRepository savingsRepository;
    private final LoanRepository loanRepository;
    private final CapitalRepository capitalRepository;
    private final StockHoldingsRepository stockHoldingsRepository;
    private final StockHistoryRepository stockHistoryRepository;
    private final ChartRepository chartRepository;
    private final TurnRecordRepository turnRecordRepository;
    private final NextTurnRecordRepository nextTurnRecordRepository;
    private final WarningRecordRepository warningRecordRepository;

    @Override
    @Transactional
    public void nextTurn(long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (animal.getTurn() >= 50) {
            throw new CustomException(TURN_OVER_EXCEPTION);
        }

        // 1턴 증가
        animal.increaseAnimalTurn();
        animal.setIsWorked(false);

        // 턴 기록
        TurnRecord turnRecord = TurnRecord.builder()
                .turnRecordTurn(animal.getTurn())
                .dailyCharge(0L)
                .loanMake(0L)
                .loanRepay(0L)
                .stockBuy(0L)
                .stockSell(0L)
                .depositMake(0L)
                .depositFinish(0L)
                .savingsMake(0L)
                .savingsPay(0L)
                .savingsFinish(0L)
                .capitalMake(0L)
                .capitalRepay(0L)
                .animal(animal)
                .build();

        // 고지서 기록
        WarningRecord warningRecord = WarningRecord.builder()
                .warningRecordTurn(animal.getTurn())
                .warningSavingsCount(0L)
                .warningLoanCount(0L)
                .depositTotal(0L)
                .depositRepay(0L)
                .savingsTotal(0L)
                .savingsRepay(0L)
                .stockTotal(0L)
                .stockRepay(0L)
                .animal(animal)
                .build();

        // 예금 다음 턴으로 넘어가기
        long depositMature = depositGoToNextTurn(animal);
        turnRecord.setDepositFinish(depositMature);

        // 적금 다음 턴으로 넘어가기
        SavingsNextTurnDTO savingsNextTurnDTO = savingsGoToNextTurn(animal);
        turnRecord.setSavingsFinish(savingsNextTurnDTO.getSavingsFinishTotal());
        turnRecord.setSavingsPay(-savingsNextTurnDTO.getSavingsPayTotal());
        warningRecord.setWarningSavingsCount(savingsNextTurnDTO.getWarningSavingsCount());

        // 대출 다음 턴으로 넘어가기
        LoanWarningDTO loanWarningDTO = loanGoToNextTurn(animal);
        turnRecord.setLoanRepay(-loanWarningDTO.getLoanTotalRepayment());
        warningRecord.setWarningLoanCount(loanWarningDTO.getWarningLoanCount());
        warningRecord.setDepositTotal(loanWarningDTO.getDepositTotal());
        warningRecord.setDepositRepay(loanWarningDTO.getDepositRepay());
        warningRecord.setSavingsTotal(loanWarningDTO.getSavingsTotal());
        warningRecord.setSavingsRepay(loanWarningDTO.getSavingsRepay());
        warningRecord.setStockTotal(loanWarningDTO.getStockTotal());
        warningRecord.setStockRepay(loanWarningDTO.getStockRepay());

        // 사채 다음 턴으로 넘어가기
        long capitalRepay = capitalGoToNextTurn(animal);
        turnRecord.setCapitalRepay(-capitalRepay);

        turnRecordRepository.save(turnRecord);
        warningRecordRepository.save(warningRecord);

        NextTurnRecord nextTurnRecord = NextTurnRecord.builder()
                .nextTurnRecordTurn(animal.getTurn() + 1)
                .nextSavingsRepayment(0L)
                .nextLoanRepayment(0L)
                .nextCapitalRepayment(0L)
                .animal(animal)
                .build();

        // 적금 지출 예측
        long savingsExpect = savingsExpect(animal);
        nextTurnRecord.setNextSavingsRepayment(-savingsExpect);

        // 대출 지출 예측
        long loanExpect = loanExpect(animal);
        nextTurnRecord.setNextLoanRepayment(-loanExpect);

        // 사채 지출 예측
        long capitalExpect = capitalExpect(animal);
        nextTurnRecord.setNextCapitalRepayment(-capitalExpect);

        nextTurnRecordRepository.save(nextTurnRecord);
    }

    @Override
    @Transactional(readOnly = true)
    public TurnRecordResponse getTurnRecord(long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn())
                .orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));

        return TurnRecordResponse.builder()
                .dailyCharge(turnRecord.getDailyCharge())
                .loanMake(turnRecord.getLoanMake())
                .loanRepay(turnRecord.getLoanRepay())
                .stockBuy(turnRecord.getStockBuy())
                .stockSell(turnRecord.getStockSell())
                .depositMake(turnRecord.getDepositMake())
                .depositFinish(turnRecord.getDepositFinish())
                .savingsMake(turnRecord.getSavingsMake())
                .savingsPay(turnRecord.getSavingsPay())
                .savingsFinish(turnRecord.getSavingsFinish())
                .capitalMake(turnRecord.getCapitalMake())
                .capitalRepay(turnRecord.getCapitalRepay())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public WarningRecordResponse getWarningRecord(long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        WarningRecord warningRecord = warningRecordRepository.findByAnimalAndWarningRecordTurn(animal, animal.getTurn())
                .orElseThrow(() -> new CustomException(WARNING_RECORD_NOT_FOUND));

        WarningRecordResponse warningRecordResponse = WarningRecordResponse.builder()
                .warningSavingsCount(warningRecord.getWarningSavingsCount())
                .warningLoanCount(warningRecord.getWarningLoanCount())
                .depositTotal(warningRecord.getDepositTotal())
                .depositRepay(warningRecord.getDepositRepay())
                .savingsTotal(warningRecord.getSavingsTotal())
                .savingsRepay(warningRecord.getSavingsRepay())
                .stockTotal(warningRecord.getStockTotal())
                .stockRepay(warningRecord.getStockRepay())
                .build();

        return warningRecordResponse;
    }

    @Override
    @Transactional(readOnly = true)
    public NextTurnRecordResponse getNextTurnRecord(long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        NextTurnRecord nextTurnRecord = nextTurnRecordRepository.findByAnimalAndNextTurnRecordTurn(animal, animal.getTurn() + 1)
                .orElseThrow(() -> new CustomException(NEXT_TURN_RECORD_NOT_FOUND));

        NextTurnRecordResponse nextTurnRecordResponse = NextTurnRecordResponse.builder()
                .nextSavingsRepayment(nextTurnRecord.getNextSavingsRepayment())
                .nextLoanRepayment(nextTurnRecord.getNextLoanRepayment())
                .nextCapitalRepayment(nextTurnRecord.getNextCapitalRepayment())
                .build();

        return nextTurnRecordResponse;
    }

    // 예금 다음 턴으로 넘어가기
    @Override
    @Transactional
    public long depositGoToNextTurn(Animal animal) {
        return depositMature(animal);
    }

    // 예금 만기
    @Override
    @Transactional
    public long depositMature(Animal animal) {
        // 만기인 예금 모두 조회
        List<Deposit> depositList = depositRepository.findAllByAnimalAndDepositEndTurn(animal, animal.getTurn());
        long total = 0;
        for (Deposit deposit : depositList) {
            deposit.changeDepositIsEnd(true);
            long money = deposit.getDepositAmount() + deposit.getDepositAmount() * deposit.getDepositType().getDepositRate() / 100;

            // 예적금형 캐릭터인 경우 최종 수익 5% 추가 증가
            if (animal.getAnimalType().getAnimalTypeId() == 2) {
                money += money * 5 / 100;
            }
            animal.increaseAnimalAssets(money);
            total += money;

            // 예치금액 5천만원 이상이면 신용등급 1단계 증가
            if (deposit.getDepositAmount() >= 50000000) {
                if (animal.getCredit() > 1) {
                    animal.changeAnimalCredit(animal.getCredit() - 1);
                }
            }
        }
        return total;
    }

    // 적금 다음 턴으로 넘어가기
    @Override
    @Transactional
    public SavingsNextTurnDTO savingsGoToNextTurn(Animal animal) {
        // 캐릭터는 이미 다음턴으로 넘어온 상태
        long savingsWarnCount = 0;
        long payTotal = 0;
        long total = 0;

        // 진행 중인 적금 모두 조회
        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);

        for (Savings savings : savingsList) {
            // 이자 추가
            SavingsType savingsType = savings.getSavingsType();
            double rate = Math.ceil(((double) savingsType.getSavingsRate() / savingsType.getSavingsPeriod()) / 100.0);
            savings.increaseSavingsInterest((long) Math.ceil((savings.getSavingsAmount() * rate)));

            // 적금이 만료된 경우 돈 반환
            if (savings.getSavingsEndTurn().equals(animal.getTurn())) {
                total += savingsMature(savings, animal);
                continue;
            }

            // 돈이 없는 경우
            long monthlyPayment = savings.getSavingsPayment();
            if (animal.getAssets() < monthlyPayment) {
                if (savings.getSavingsWarning()) {
                    // 경고 받은 적있는 경우 강제 적금 해지
                    savings.changeSavingsIsEnd(true);
                    animal.increaseAnimalAssets(savings.getSavingsAmount() + savings.getSavingsAmount() / 200);
                    total += savings.getSavingsAmount() + savings.getSavingsAmount() / 200;
                } else {
                    // 경고 처음인 경우
                    savings.changeSavingsWarning(true);
                    savingsWarnCount++;
                }
                continue;
            }

            // 적금에 돈 넣음
            savings.increaseSavingsAmount(monthlyPayment);
            payTotal += monthlyPayment;
            // 현금 빠져나감
            animal.decreaseAnimalAssets(monthlyPayment);
        }

        return SavingsNextTurnDTO.builder()
                .savingsFinishTotal(total)
                .warningSavingsCount(savingsWarnCount)
                .savingsPayTotal(payTotal)
                .build();
    }

    // 적금 만기
    @Override
    @Transactional
    public long savingsMature(Savings savings, Animal animal) {
        savings.changeSavingsIsEnd(true);
        long money = savings.getSavingsAmount() + savings.getSavingsInterest();

        // 예적금형 캐릭터인 경우 최종 수익 5% 추가 증가
        if (animal.getAnimalType().getAnimalTypeId() == 2) {
            money += money * 5 / 100;
        }
        animal.increaseAnimalAssets(money);

        // 예치 금액 5천만원 이상이면 신용등급 1단계 증가
        if (savings.getSavingsAmount() >= 50000000) {
            if (animal.getCredit() > 1) {
                animal.changeAnimalCredit(animal.getCredit() - 1);
            }
        }

        return money;
    }

    // 적금 지출 예측
    @Override
    @Transactional(readOnly = true)
    public long savingsExpect(Animal animal) {
        // 진행 중인 적금 모두 조회
        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);
        long total = 0L;

        for (Savings savings : savingsList) {

            if (savings.getSavingsEndTurn().equals(animal.getTurn() + 1)) {
                // 마지막 턴인 경우 넘어감
                continue;
            }

            total += savings.getSavingsPayment();

        }

        return total;
    }

    // 대출 다음 턴으로 넘어가기
    @Override
    @Transactional
    public LoanWarningDTO loanGoToNextTurn(Animal animal) {
        // 캐릭터는 이미 다음턴으로 넘어온 상태
        LoanWarningDTO loanWarningDTO = LoanWarningDTO.builder()
                .originalAssets(animal.getAssets())
                .warningLoanCount(0L)
                .depositTotal(0L)
                .depositRepay(0L)
                .savingsTotal(0L)
                .savingsRepay(0L)
                .stockTotal(0L)
                .stockRepay(0L)
                .build();
        long warnListRepayment = 0;
        long loanTotalRepayment = 0;

        // 진행중인 대출 모두 조회
        List<Loan> loanList = loanRepository.findAllByAnimalAndLoanIsEndFalse(animal);
        List<LoanRepayDTO> warnList = new ArrayList<>();
        List<LoanRepayDTO> nonWarnList = new ArrayList<>();

        for (Loan loan : loanList) {
            // 현재 턴에 전체 얼마 내야하는지 계산 (대출 방식, 대출 원금, 이자율, 대출 기간, 현재 턴)
            Long repayment = repay(loan.getLoanType(), loan.getLoanAmount(), loan.getLoanRate(),
                    loan.getLoanPeriod(), loan.getLoanPeriod() - loan.getLoanToEnd() + 1);

            if (loan.getLoanWarning()) {
                warnList.add(LoanRepayDTO.builder().loan(loan).loanRepay(repayment).build());
                warnListRepayment += repayment;
            } else {
                nonWarnList.add(LoanRepayDTO.builder().loan(loan).loanRepay(repayment).build());
            }
        }

        // 경고 받은 진짜 갚아야할 금액중 현금 보유액 제거.
        warnListRepayment -= animal.getAssets();

        // (갚아야할 금액이 아직 남은 경우) -> 압류
        if (warnListRepayment > 0) {
            // 신용등급 1단계 감소
            long credit = animal.getCredit();
            animal.changeAnimalCredit(credit < 10 ? credit + 1 : credit);

            // 예금 압류
            deleteAllDeposit(animal, loanWarningDTO);

            // 예금 상환 금액 loanWarningDTO.setDepositRepay()
            // if (예금 압류 총액 > 갚아야할 금액)
            // 예금 상환 금액 = 갚아야할 금액
            // if (예금 압류 총액 <= 갚아야할 금액)
            // 예금 상환 금액 = 예금 압류 총액
            if (loanWarningDTO.getDepositTotal() > warnListRepayment) {
                loanWarningDTO.setDepositRepay(warnListRepayment);
            } else {
                loanWarningDTO.setDepositRepay(loanWarningDTO.getDepositTotal());
            }

            // 경고 받은 진짜 갚아야할 금액 중 예금 압류 총액 제거.
            warnListRepayment -= loanWarningDTO.getDepositTotal();

            // 예금 압류 했는데도 모자람
            if (warnListRepayment > 0) {
                // 적금 압류
                deleteAllSavings(animal, loanWarningDTO);

                if (loanWarningDTO.getSavingsTotal() > warnListRepayment) {
                    loanWarningDTO.setSavingsRepay(warnListRepayment);
                } else {
                    loanWarningDTO.setSavingsRepay(loanWarningDTO.getSavingsTotal());
                }

                warnListRepayment -= loanWarningDTO.getSavingsTotal();
            }

            // 적금 압류 했는데도 모자람
            if (warnListRepayment > 0) {
                // 주식 압류
                deleteAllStock(animal, loanWarningDTO);

                if (loanWarningDTO.getStockTotal() > warnListRepayment) {
                    loanWarningDTO.setStockRepay(warnListRepayment);
                } else {
                    loanWarningDTO.setStockRepay(loanWarningDTO.getStockTotal());
                }

                warnListRepayment -= loanWarningDTO.getStockTotal();
            }

        }

        // (경고 O) 대출
        for (LoanRepayDTO loanRepayDTO : warnList) {
            // 사용자 현금 차감, 남은 대출금 차감, 차감 후 남은 턴 1 감소
            animal.decreaseAnimalAssets(loanRepayDTO.getLoanRepay());
            loanRepayDTO.getLoan().decreaseLoanRemain(loanRepayDTO.getLoanRepay());
            loanRepayDTO.getLoan().decreaseLoanToEnd(1L);
            loanTotalRepayment += loanRepayDTO.getLoanRepay();

            // if (남은 턴 == 0) 대출 종료
            if (loanRepayDTO.getLoan().getLoanToEnd() == 0) {
                loanRepayDTO.getLoan().changeLoanIsEnd(true);
            }
        }

        // (경고 X) 대출
        long animalAsset = animal.getAssets();
        for (LoanRepayDTO loanRepayDTO : nonWarnList) {

            animalAsset -= loanRepayDTO.getLoanRepay();
            if (animalAsset > 0) {
                // 사용자 현금 차감, 남은 대출금 차감, 차감 후 남은 턴 1 감소
                animal.decreaseAnimalAssets(loanRepayDTO.getLoanRepay());
                loanRepayDTO.getLoan().decreaseLoanRemain(loanRepayDTO.getLoanRepay());
                loanRepayDTO.getLoan().decreaseLoanToEnd(1L);
                loanTotalRepayment += loanRepayDTO.getLoanRepay();
            } else {
                // 경고
                loanRepayDTO.getLoan().changeLoanWarning(true);
                loanWarningDTO.increaseWarningLoanCount();
            }

            // if (남은 턴 == 0) 대출 종료
            if (loanRepayDTO.getLoan().getLoanToEnd() == 0) {
                loanRepayDTO.getLoan().changeLoanIsEnd(true);
            }
        }

        loanWarningDTO.setLoanTotalRepayment(loanTotalRepayment);
        return loanWarningDTO;
    }

    // 예금 전부 압류
    @Override
    @Transactional
    public void deleteAllDeposit(Animal animal, LoanWarningDTO loanWarningDTO) {
        long money = 0L;

        // 만기 안된 예금 모두 조회
        List<Deposit> depositList = depositRepository.findAllByAnimalAndDepositIsEndFalse(animal);

        for (Deposit deposit : depositList) {
            // 예금 종료 처리
            deposit.changeDepositIsEnd(true);
            money += deposit.getDepositAmount();
        }

        animal.increaseAnimalAssets(money);
        loanWarningDTO.setDepositTotal(money);
    }

    // 적금 전부 압류
    @Override
    @Transactional
    public void deleteAllSavings(Animal animal, LoanWarningDTO loanWarningDTO) {
        long money = 0L;

        // 만기 안된 적금 모두 조회
        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);

        for (Savings savings : savingsList) {
            // 적금 종료 처리
            savings.changeSavingsIsEnd(true);
            money += savings.getSavingsAmount();
        }

        animal.increaseAnimalAssets(money);
        loanWarningDTO.setSavingsTotal(money);
    }

    // 주식 전부 압류
    @Override
    @Transactional
    public void deleteAllStock(Animal animal, LoanWarningDTO loanWarningDTO) {
        long money = 0L;

        // 주식 모두 팔고 판 금액 animal.assets와 money에 더하기.
        List<StockHoldings> stockHoldingsList = stockHoldingsRepository.findAllByAnimalAndStockIsSoldFalse(animal);

        for (StockHoldings stockHoldings : stockHoldingsList) {
            Stock stock = stockHoldings.getStock();

            Chart chart = chartRepository.findByStockAndTurn(stock, animal.getTurn())
                    .orElseThrow(() -> new CustomException(CHART_NOT_FOUND_EXCEPTION));

            money += stockHoldings.getStockCount() * chart.getPrice();

            stockHoldings.setStockIsSold(true);
            stockHistoryRepository.save(StockHistory.builder()
                    .stock(stock)
                    .animal(animal)
                    .tradeCount(stockHoldings.getStockCount())
                    .isBuy(false)
                    .turn(animal.getTurn())
                    .build());
        }

        animal.increaseAnimalAssets(money);
        loanWarningDTO.setStockTotal(money);
    }

    // 대출금 계산 함수
    private long repay(long loanType, long loanAmount, long loanRate, long loanPeriod, long turn) {
        if (loanType == 1L) {
            // 만기 일시 상환
            return manGi(loanAmount, loanRate, loanPeriod, turn);
        } else if (loanType == 2L) {
            // 원금 균등 상환
            return wonGum(loanAmount, loanRate, loanPeriod, turn);
        } else if (loanType == 3L) {
            // 원리금 균등 상환
            return wonLeeGum(loanAmount, loanRate, loanPeriod);
        } else {
            throw new CustomException(NO_SUCH_LOAN_TYPE_EXCEPTION);
        }
    }

    // 만기 일시 상환
    private long manGi(long loanAmount, long loanRate, long loanPeriod, long turn) {
        // 이자 계산
        long interest = loanAmount * loanRate / 100;

        // 현재 턴이 마지막 턴인지 확인
        if (turn < loanPeriod) {
            return interest;
        } else {
            return interest + loanAmount;
        }
    }

    // 원금 균등 상환
    private long wonGum(long loanAmount, long loanRate, long loanPeriod, long turn) {
        // 매 턴마다 상환할 원금
        long principalRepayment = loanAmount / loanPeriod;

        // 남은 대출 원금
        long remainingPrincipal = loanAmount - principalRepayment * (turn - 1);

        // 현재 턴에 대한 이자
        long interest = remainingPrincipal * loanRate / 100;

        // 총 상환 금액
        return principalRepayment + interest;
    }

    // 원리금 균등 상환
    private long wonLeeGum(long loanAmount, long loanRate, long loanPeriod) {
        // 이자율
        double ratePerTurn = (double) loanRate / 100;

        // 매 턴마다 상환해야 할 금액 계산
        double temp = Math.pow(1 + ratePerTurn, loanPeriod);
        double paymentPerTurn = loanAmount * ratePerTurn * temp / (temp - 1);

        return (long) Math.floor(paymentPerTurn);
    }

    // 대출 지출 예측
    @Override
    @Transactional(readOnly = true)
    public long loanExpect(Animal animal) {

        List<Loan> loanList = loanRepository.findAllByAnimalAndLoanIsEndFalse(animal);
        long total = 0L;

        for (Loan loan : loanList) {
            // 다음 턴에 전체 얼마 내야하는지 계산 (대출 방식, 대출 원금, 이자율, 대출 기간, 다음 턴)
            Long repayment = repay(loan.getLoanType(), loan.getLoanAmount(), loan.getLoanRate(),
                    loan.getLoanPeriod(), loan.getLoanPeriod() - loan.getLoanToEnd() + 1);

            total += repayment;
        }

        return total;
    }

    // 사채 다음 턴으로 넘어가기
    @Override
    @Transactional
    public long capitalGoToNextTurn(Animal animal) {

        List<Capital> capitalList = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);
        long capitalFinish = 0;

        for (Capital capital : capitalList) {
            // 일단 대출액 증가
            capital.compoundInterest();

            if (animal.getTurn().equals(capital.getCapitalEndTurn())) {
                // 마감 턴인 경우

                LoanWarningDTO loanWarningDTO = LoanWarningDTO.builder().build();
                long repayment = capital.getCapitalRemain();

                // 사채 대출액 중, 현금 보유액 제거.
                repayment -= animal.getAssets();

                // (갚아야할 금액이 아직 남은 경우) -> 압류
                if (repayment > 0) {
                    // 예금 압류
                    deleteAllDeposit(animal, loanWarningDTO);

                    // 경고 받은 진짜 갚아야할 금액중 예금 압류 총액 제거.
                    repayment -= loanWarningDTO.getDepositTotal();

                    // 예금 압류 했는데도 모자람
                    if (repayment > 0) {
                        // 적금 압류
                        deleteAllSavings(animal, loanWarningDTO);

                        repayment -= loanWarningDTO.getSavingsTotal();
                    }

                    // 적금 압류 했는데도 모자람
                    if (repayment > 0) {
                        // 주식 압류
                        deleteAllStock(animal, loanWarningDTO);

                        repayment -= loanWarningDTO.getStockTotal();
                    }

                }

                // 사용자 현금 차감, 대출금 0, 대출 종료
                animal.decreaseAnimalAssets(capital.getCapitalRemain());
                capital.changeCapitalRemain(0L);
                capital.changeCapitalIsEnd(true);
                capitalFinish += capital.getCapitalRemain();
            }

        }
        return capitalFinish;
    }

    // 사채 지출 예측
    @Override
    @Transactional(readOnly = true)
    public long capitalExpect(Animal animal) {

        List<Capital> capitalList = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);
        long total = 0L;

        for (Capital capital : capitalList) {
            // 마감턴일 경우 money에 추가
            if (capital.getCapitalEndTurn().equals(animal.getTurn() + 1)) {
                total = capital.getCapitalAmount() + capital.getCapitalAmount() / 10;
            }
        }

        return total;
    }
}
