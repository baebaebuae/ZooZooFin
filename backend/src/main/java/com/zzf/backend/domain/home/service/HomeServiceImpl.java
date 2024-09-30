package com.zzf.backend.domain.home.service;

import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.capital.entity.Capital;
import com.zzf.backend.domain.capital.repository.CapitalRepository;
import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.domain.loan.entity.Loan;
import com.zzf.backend.domain.loan.repository.LoanRepository;
import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.ANIMAL_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService{

    private final AnimalRepository animalRepository;
    private final DepositRepository depositRepository;
    private final SavingsRepository savingsRepository;
    private final LoanRepository loanRepository;
    private final CapitalRepository capitalRepository;


    @Override
    @Transactional(readOnly = true)
    public long getMyDepositSavings(Long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        return getMyTotalDeposit(animal) + getMyTotalSavings(animal);
    }

    // 전 재산을 계산해주는 함수
    @Override
    @Transactional(readOnly = true)
    public long calculateTotalAssets(Animal animal){
        // 현재 보유금액 + 총 예금 + 총 적금 + 총 주식
        // - 대출금 - 사채

        long totalAssets = 0;

        // 보유 금액
        totalAssets += animal.getAnimalAssets();

        // 총 예금
        totalAssets += getMyTotalDeposit(animal);

        // 총 적금
        totalAssets += getMyTotalSavings(animal);

        // 총 주식
        // totalAssets += getMyTotalStock(character);

        // 총 대출금
        totalAssets -= getMyRestLoans(animal);

        // 사채
        totalAssets -= getMyTotalCapitals(animal);

        return totalAssets;
    }

    // 전체 예금액 구하기
    @Override
    @Transactional(readOnly = true)
    public long getMyTotalDeposit(Animal animal){
        long money = 0L;

        List<Deposit> depositList = depositRepository.findAllByAnimalAndDepositIsEndFalse(animal);

        for (Deposit deposit : depositList){
            money += deposit.getDepositAmount();
        }

        return money;
    }

    // 전체 적금 납입금 총액 구하기
    @Override
    @Transactional(readOnly = true)
    public long getMyTotalSavings(Animal animal){
        long money = 0L;

        // 만기 안된 적금 모두 조회
        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);

        for (Savings savings : savingsList){
            money += savings.getSavingsAmount();
        }

        return money;
    }

    // 남은 대출액 계산
    @Override
    @Transactional(readOnly = true)
    public long getMyRestLoans(Animal animal){
        long money = 0L;

        // 진행중인 대출 모두 조회
        List<Loan> loanList = loanRepository.findAllByAnimalAndLoanIsEndFalse(animal);

        for(Loan loan : loanList){
            money += loan.getLoanRemain();
        }

        return money;
    }

    // 전체 대출액 계산
    @Override
    @Transactional(readOnly = true)
    public long getMyTotalLoans(Animal animal) {
        long money = 0L;

        // 진행중인 대출 모두 조회
        List<Loan> loanList = loanRepository.findAllByAnimalAndLoanIsEndFalse(animal);

        for(Loan loan : loanList){
            money += loan.getLoanAmount();
        }

        return money;
    }

    // 남은 사채 조회
    @Override
    @Transactional(readOnly = true)
    public long getMyTotalCapitals(Animal animal) {
        long money = 0L;

        // 진행중인 사채 모두 조회
        // 사채는 1회만 대출 가능하지만 코드 일관성을 위해 그냥 findAll 이라고 함
        List<Capital> capitalList = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);

        for (Capital capital : capitalList){
            money += capital.getCapitalRemain();
        }

        return money;
    }

}
