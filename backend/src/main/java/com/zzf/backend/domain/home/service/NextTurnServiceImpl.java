package com.zzf.backend.domain.home.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.capital.entity.Capital;
import com.zzf.backend.domain.capital.repository.CapitalRepository;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.domain.home.DTO.LoanRepayDTO;
import com.zzf.backend.domain.home.DTO.LoanWarningDTO;
import com.zzf.backend.domain.loan.entity.Loan;
import com.zzf.backend.domain.loan.repository.LoanRepository;
import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.savings.entity.SavingsType;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.NO_SUCH_LOAN_TYPE_EXCEPTION;

@Service
@RequiredArgsConstructor
public class NextTurnServiceImpl implements NextTurnService{

    private final DepositRepository depositRepository;
    private final SavingsRepository savingsRepository;
    private final LoanRepository loanRepository;
    private final CapitalRepository capitalRepository;
    // private final StockRepository;

    // 예금 다음날로 넘어가기
    @Override
    @Transactional
    public void depositGoToNextTurn(Animal animal) {
        depositMature(animal);
    }

    // 예금 만기
    @Override
    @Transactional
    public void depositMature(Animal animal) {
        // 만기인 예금 모두 조회
        List<Deposit> depositList = depositRepository.findAllByAnimalAndDepositEndTurn(animal, animal.getAnimalTurn());

        for (Deposit deposit : depositList) {
            deposit.changeDepositIsEnd(true);
            long money = deposit.getDepositAmount() + deposit.getDepositAmount() * deposit.getDepositType().getDepositRate() / 100;

            // 예적금형 캐릭터인 경우 최종 수익 5% 추가 증가
            if (animal.getAnimalType().getAnimalTypeId() == 2) {
                money += money * 5 / 100;
            }
            animal.increaseAnimalAssets(money);

            // 예치금액 5천만원 이상이면 신용등급 1단계 증가
            if (deposit.getDepositAmount() >= 50000000) {
                if (animal.getAnimalCredit() > 1) {
                    animal.changeAnimalCredit(animal.getAnimalCredit() - 1);
                }
            }
        }
    }

    // 적금 다음날로 넘어가기
    @Override
    @Transactional
    public long savingsGoToNextTurn(Animal animal){
        // 캐릭터는 이미 다음턴으로 넘어온 상태
        long savingsWarnCount = 0;

        // 진행 중인 적금 모두 조회
        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);

        for (Savings savings : savingsList){
            // 이자 추가
            SavingsType savingsType = savings.getSavingsType();
            double rate = Math.ceil(((double) savingsType.getSavingsRate() / savingsType.getSavingsPeriod()) / 100.0);
            savings.increaseSavingsInterest((long) Math.ceil((savings.getSavingsAmount() * rate)));

            // 적금이 만료된 경우 돈 반환
            if (savings.getSavingsEndTurn().equals(animal.getAnimalTurn())){
                savingsMature(savings, animal);
                continue;
            }

            // 돈이 없는 경우
            long monthlyPayment = savings.getSavingsPayment();
            if (animal.getAnimalAssets() < monthlyPayment){
                if (savings.getSavingsWarning()){
                    // 경고 받은 적있는 경우 강제 적금 해지
                    savings.changeSavingsIsEnd(true);
                    animal.increaseAnimalAssets( savings.getSavingsAmount() + savings.getSavingsAmount() / 200);
                }else{
                    // 경고 처음인 경우
                    savings.changeSavingsWarning(true);
                    savingsWarnCount++;
                }
                continue;
            }

            // 적금에 돈 넣음
            savings.increaseSavingsAmount(monthlyPayment);
            // 현금 빠져나감
            animal.decreaseAnimalAssets(monthlyPayment);
        }

        return savingsWarnCount;
    }

    // 적금 만기
    @Override
    @Transactional
    public void savingsMature(Savings savings, Animal animal){
        savings.changeSavingsIsEnd(true);

        long money = savings.getSavingsAmount() + savings.getSavingsInterest();

        // 예적금형 캐릭터인 경우 최종 수익 5% 추가 증가
        if (animal.getAnimalType().getAnimalTypeId() == 2) {
            money += money * 5 / 100;
        }
        animal.increaseAnimalAssets(money);

        // 예치 금액 5천만원 이상이면 신용등급 1단계 증가
        if (savings.getSavingsAmount() >= 50000000){
            if (animal.getAnimalCredit() > 1){
                animal.changeAnimalCredit(animal.getAnimalCredit() - 1);
            }
        }

    }

    /**
     * <h3>대출 다음날로 넘어가기</h3>
     * @param animal 플레이어블 캐릭터
     * @return LoanWarningDTO gameOver에 false가 나오면 통과 true가 있으면 파산.
     */
    @Override
    @Transactional
    public LoanWarningDTO loanGoToNextTurn(Animal animal) {
        // 캐릭터는 이미 다음턴으로 넘어온 상태
        LoanWarningDTO loanWarningDTO = LoanWarningDTO.builder()
                .originalAssets(animal.getAnimalAssets())
                .warningLoanCount(0L)
                .depositTotal(0L)
                .depositRepay(0L)
                .savingsTotal(0L)
                .savingsRepay(0L)
                .stockTotal(0L)
                .stockRepay(0L)
                .gameOver(false)
                .build();
        long warnListRepayment = 0;
        long nonWarnListRepayment = 0;
        int sellLevel = 0;

        // 진행중인 대출 모두 조회
        List<Loan> loanList = loanRepository.findAllByAnimalAndLoanIsEndFalse(animal);
        List<LoanRepayDTO> warnList = new ArrayList<>();
        List<LoanRepayDTO> nonWarnList = new ArrayList<>();

        for (Loan loan : loanList){
            // 이번달에 전체 얼마 내야하는지 계산 (대출 방식, 대출 원금, 이자율, 대출 기간, 현재 턴)
            Long repayment = repay(loan.getLoanType(), loan.getLoanAmount(), loan.getLoanRate(),
                    loan.getLoanPeriod(), loan.getLoanPeriod() - loan.getLoanToEnd() + 1);

            if (loan.getLoanWarning()){
                warnList.add(LoanRepayDTO.builder().loan(loan).loanRepay(repayment).build());
                warnListRepayment += repayment;
            }else{
                nonWarnList.add(LoanRepayDTO.builder().loan(loan).loanRepay(repayment).build());
                nonWarnListRepayment += repayment;
            }
        }

        // 경고 받은 진짜 갚아야할 금액중 현금 보유액 제거.
        warnListRepayment -= animal.getAnimalAssets();

        // (갚아야할 금액이 아직 남은 경우) -> 압류
        if (warnListRepayment > 0){
            // 신용등급 1단계 감소
            long credit = animal.getAnimalCredit();
            animal.changeAnimalCredit(credit < 10 ? credit + 1 : credit);

            // 예금 압류
            deleteAllDeposit(animal, loanWarningDTO);

            // 예금 상환 금액 loanWarningDTO.setDepositRepay()
            // if (예금 압류 총액 > 갚아야할 금액)
            // 예금 상환 금액 = 갚아야할 금액
            // if (예금 압류 총액 <= 갚아야할 금액)
            // 예금 상환 금액 = 예금 압류 총액
            if (loanWarningDTO.getDepositTotal() > warnListRepayment){
                loanWarningDTO.setDepositRepay(warnListRepayment);
            }else{
                loanWarningDTO.setDepositRepay(loanWarningDTO.getDepositTotal());
            }

            // 경고 받은 진짜 갚아야할 금액중 예금 압류 총액 제거.
            warnListRepayment -= loanWarningDTO.getDepositTotal();

            // 예금 압류 했는데도 모자람
            if (warnListRepayment > 0){
                // 적금 압류
                deleteAllSavings(animal, loanWarningDTO);

                if (loanWarningDTO.getSavingsTotal() > warnListRepayment){
                    loanWarningDTO.setSavingsRepay(warnListRepayment);
                }else{
                    loanWarningDTO.setSavingsRepay(loanWarningDTO.getSavingsTotal());
                }

                warnListRepayment -= loanWarningDTO.getSavingsTotal();
            }

            // 적금 압류 했는데도 모자람
            if (warnListRepayment > 0){
                // 주식 압류
                deleteAllStock(animal, loanWarningDTO);

                if (loanWarningDTO.getStockTotal() > warnListRepayment){
                    loanWarningDTO.setStockRepay(warnListRepayment);
                }else{
                    loanWarningDTO.setStockRepay(loanWarningDTO.getStockTotal());
                }

                warnListRepayment -= loanWarningDTO.getStockTotal();
            }

            // 주식 압류 했는데도 모자람
            if (warnListRepayment > 0){
                // 게임 끝. 파산.
                loanWarningDTO.setGameOver(true);
                return loanWarningDTO;
            }
        }

        // (경고 O) 대출
        for (LoanRepayDTO loanRepayDTO : warnList){
            // 사용자 현금 차감, 남은 대출금 차감, 차감 후 남은 턴 1 감소
            animal.decreaseAnimalAssets(loanRepayDTO.getLoanRepay());
            loanRepayDTO.getLoan().decreaseLoanRemain(loanRepayDTO.getLoanRepay());
            loanRepayDTO.getLoan().decreaseLoanToEnd(1L);

            // if (남은 턴 == 0) 대출 종료
            if (loanRepayDTO.getLoan().getLoanToEnd() == 0){
                loanRepayDTO.getLoan().changeLoanIsEnd(true);
            }
        }

        // (경고 X) 대출
        long animalAsset = animal.getAnimalAssets();
        for (LoanRepayDTO loanRepayDTO : nonWarnList){

            animalAsset -= loanRepayDTO.getLoanRepay();
            if (animalAsset > 0){
                // 사용자 현금 차감, 남은 대출금 차감, 차감 후 남은 턴 1 감소
                animal.decreaseAnimalAssets(loanRepayDTO.getLoanRepay());
                loanRepayDTO.getLoan().decreaseLoanRemain(loanRepayDTO.getLoanRepay());
                loanRepayDTO.getLoan().decreaseLoanToEnd(1L);
            }else{
                // 경고
                loanRepayDTO.getLoan().changeLoanWarning(true);
                loanWarningDTO.increaseWarningLoanCount();
            }

            // if (남은 턴 == 0) 대출 종료
            if (loanRepayDTO.getLoan().getLoanToEnd() == 0){
                loanRepayDTO.getLoan().changeLoanIsEnd(true);
            }
        }

        return loanWarningDTO;
    }

    // 예금 전부 압류
    @Override
    @Transactional
    public void deleteAllDeposit(Animal animal, LoanWarningDTO loanWarningDTO) {
        long money = 0L;

        // 만기 안된 예금 모두 조회
        List<Deposit> depositList = depositRepository.findAllByAnimalAndDepositIsEndFalse(animal);

        for (Deposit deposit : depositList){
            // 예금 종료 처리
            deposit.changeDepositIsEnd(true);
            animal.increaseAnimalAssets(deposit.getDepositAmount());
            money += deposit.getDepositAmount();
        }
        loanWarningDTO.setDepositTotal(money);
    }

    // 적금 전부 압류
    @Override
    @Transactional
    public void deleteAllSavings(Animal animal, LoanWarningDTO loanWarningDTO) {
        long money = 0L;

        // 만기 안된 적금 모두 조회
        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);

        for(Savings savings : savingsList){
            // 적금 종료 처리
            savings.changeSavingsIsEnd(true);
            animal.increaseAnimalAssets(savings.getSavingsAmount());
            money += savings.getSavingsAmount();
        }
        loanWarningDTO.setSavingsTotal(money);
    }

    // 주식 전부 압류
    @Override
    @Transactional
    public void deleteAllStock(Animal animal, LoanWarningDTO loanWarningDTO) {
        long money = 0L;

        // 주식 모두 팔고 판 금액 animal.assets와 money에 더하기.

        loanWarningDTO.setSavingsTotal(money);
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

    /**
     * <h3>사채 다음날로 넘어가기</h3>
     * @param animal 플레이어블 캐릭터
     * @return 사채 기간 됐을때 (못갚은 경우 Gameover true), (갚은 경우 Gameover false)
     */
    @Override
    @Transactional
    public boolean capitalGoToNextTurn(Animal animal){

        List<Capital> capitalList = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);

        for (Capital capital : capitalList){
            // 일단 대출액 증가
            capital.compoundInterest();

            if (animal.getAnimalTurn().equals(capital.getCapitalEndTurn())){
                // 마감 턴인 경우

                LoanWarningDTO loanWarningDTO = LoanWarningDTO.builder().build();
                long repayment = capital.getCapitalRemain();

                // 사채 대출액 중, 현금 보유액 제거.
                repayment -= animal.getAnimalAssets();

                // (갚아야할 금액이 아직 남은 경우) -> 압류
                if (repayment > 0){
                    // 예금 압류
                    deleteAllDeposit(animal, loanWarningDTO);

                    // 경고 받은 진짜 갚아야할 금액중 예금 압류 총액 제거.
                    repayment -= loanWarningDTO.getDepositTotal();

                    // 예금 압류 했는데도 모자람
                    if (repayment > 0){
                        // 적금 압류
                        deleteAllSavings(animal, loanWarningDTO);

                        repayment -= loanWarningDTO.getSavingsTotal();
                    }

                    // 적금 압류 했는데도 모자람
                    if (repayment > 0){
                        // 주식 압류
                        deleteAllStock(animal, loanWarningDTO);

                        repayment -= loanWarningDTO.getStockTotal();
                    }

                    // 주식 압류 했는데도 모자람
                    if (repayment > 0){
                        // 게임 끝. 파산.
                        return true;
                    }
                }

                // 사용자 현금 차감, 대출금 0, 대출 종료
                animal.decreaseAnimalAssets(capital.getCapitalRemain());
                capital.changeCapitalRemain(0L);
                capital.changeCapitalIsEnd(true);
            }


        }

        return false;

    }
}
