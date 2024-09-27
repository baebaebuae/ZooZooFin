package com.zzf.backend.domain.animal.service;

import com.zzf.backend.domain.animal.dto.AnimalCreateRequest;
import com.zzf.backend.domain.animal.dto.AnimalInfoResponse;
import com.zzf.backend.domain.animal.dto.AnimalPortfolioResponse;
import com.zzf.backend.domain.animal.dto.AnimalTypeResponse;
import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.entity.AnimalType;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.animal.repository.AnimalTypeRepository;
import com.zzf.backend.domain.animal.status.HierarchyStatus;
import com.zzf.backend.domain.capital.entity.Capital;
import com.zzf.backend.domain.capital.repository.CapitalRepository;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.domain.ending.status.EndingStatus;
import com.zzf.backend.domain.loan.entity.Loan;
import com.zzf.backend.domain.loan.repository.LoanRepository;
import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.domain.member.repository.MemberRepository;
import com.zzf.backend.domain.portfolio.entity.Portfolio;
import com.zzf.backend.domain.portfolio.repository.PortfolioRepository;
import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

    private final MemberRepository memberRepository;
    private final AnimalRepository animalRepository;
    private final AnimalTypeRepository animalTypeRepository;
    private final PortfolioRepository portfolioRepository;
    private final DepositRepository depositRepository;
    private final SavingsRepository savingsRepository;
    private final LoanRepository loanRepository;
    private final CapitalRepository capitalRepository;

    @Override
    public List<AnimalTypeResponse> getAnimalTypes() {
        List<AnimalType> animalTypeList = animalTypeRepository.findAll();

        return animalTypeList.stream().map(animalType ->
                        new AnimalTypeResponse(
                                animalType.getAnimalTypeId(),
                                animalType.getAnimalTypeName(),
                                animalType.getAnimalAbility()))
                .collect(Collectors.toList());
    }

    @Override
    public void createAnimal(String memberId, AnimalCreateRequest animalCreateRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        AnimalType animalType = animalTypeRepository.findById(animalCreateRequest.getAnimalTypeId())
                .orElseThrow(() -> new CustomException(ANIMAL_TYPE_NOT_FOUND_EXCEPTION));

        animalRepository.save(Animal.builder()
                .member(member)
                .animalType(animalType)
                .animalName(animalCreateRequest.getAnimalName())
                .animalTurn(0L)
                .animalAssets(0L)
                .animalCredit(0L)
                .animalHierarchy(HierarchyStatus.PART_TIME.getHierarchyName())
                .animalIsWork(false)
                .animalIsEnd(false)
                .animalQuestCleared(false)
                .build());
    }

    @Override
    public AnimalPortfolioResponse getPortfolio(String memberId, Long animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (!animal.getMember().getMemberId().equals(memberId)) {
            throw new CustomException(ANIMAL_UNAVAILABLE_EXCEPTION);
        }

        Portfolio portfolio = portfolioRepository.findByAnimal(animal)
                .orElseThrow(() -> new CustomException(PORTFOLIO_NOT_FOUND_EXCEPTION));

        return AnimalPortfolioResponse.builder()
                .animalName(animal.getAnimalName())
                .animalAsset(animal.getAnimalAssets())
                .animalCredit(animal.getAnimalCredit())
                .portfolio(AnimalPortfolioResponse.Portfolio.builder()
                        .depositPercent(portfolio.getPortfolioDepositPercent())
                        .savingsPercent(portfolio.getPortfolioSavingsPercent())
                        .stockPercent(portfolio.getPortfolioStockPercent())
                        .investmentStyle(portfolio.getPortfolioInvestStyle())
                        .ending(EndingStatus
                                .getEndingStatus(portfolio.getPortfolioEnding())
                                .getEndingName())
                        .build())
                .build();
    }

    @Override
    public AnimalInfoResponse getAnimalInfo(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member)
                .orElseThrow(() -> new CustomException(ANIMAL_ALL_END_EXCEPTION));

        List<Deposit> deposit = depositRepository.findAllByAnimalAndDepositIsEndFalse(animal);
        Long depositTotal = deposit.stream()
                .map(Deposit::getDepositAmount)
                .reduce(0L, Long::sum);

        List<Savings> savings = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);
        Long savingsTotal = savings.stream()
                .map(Savings::getSavingsAmount)
                .reduce(0L, Long::sum);

        List<Loan> loan = loanRepository.findAllByAnimalAndLoanIsEndFalse(animal);
        Long loanTotal = loan.stream()
                .map(Loan::getLoanAmount)
                .reduce(0L, Long::sum);

        List<Capital> capital = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);
        Long capitalTotal = capital.stream()
                .map(Capital::getCapitalAmount)
                .reduce(0L, Long::sum);

        long allTotal = 0L;
        allTotal += animal.getAnimalAssets();
        allTotal += depositTotal;
        allTotal += savingsTotal;
        allTotal += loanTotal;
        allTotal += capitalTotal;

        return AnimalInfoResponse.builder()
                .animalName(animal.getAnimalName())
                .animalAbility(animal.getAnimalType().getAnimalAbility())
                .animalHierarchy(animal.getAnimalHierarchy())
                .animalCredit(animal.getAnimalCredit())
                .isSolveQuizToday(member.getMemberIsSolveQuiz())
                .isWorkToday(animal.getAnimalIsWork())
                .totalAmount(allTotal)
                .totalAssets(animal.getAnimalAssets())
                .totalDeposit(depositTotal)
                .totalSavings(savingsTotal)
                .totalStock(savingsTotal)
                .totalLoan(loanTotal)
                .totalCapital(capitalTotal)
                .build();
    }
}
