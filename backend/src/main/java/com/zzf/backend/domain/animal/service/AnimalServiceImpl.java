package com.zzf.backend.domain.animal.service;

import com.zzf.backend.domain.animal.dto.*;
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
import com.zzf.backend.domain.home.entity.NextTurnRecord;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.entity.WarningRecord;
import com.zzf.backend.domain.home.repository.NextTurnRecordRepository;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.domain.home.repository.WarningRecordRepository;
import com.zzf.backend.domain.loan.entity.Loan;
import com.zzf.backend.domain.loan.repository.LoanRepository;
import com.zzf.backend.domain.portfolio.entity.Portfolio;
import com.zzf.backend.domain.portfolio.repository.PortfolioRepository;
import com.zzf.backend.domain.quest.entity.Quest;
import com.zzf.backend.domain.quest.entity.QuestHistory;
import com.zzf.backend.domain.quest.repository.QuestHistoryRepository;
import com.zzf.backend.domain.quest.repository.QuestRepository;
import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.domain.stock.entity.StockHoldings;
import com.zzf.backend.domain.stock.repository.StockHoldingsRepository;
import com.zzf.backend.global.auth.entity.Member;
import com.zzf.backend.global.auth.repository.MemberRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
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
    private final StockHoldingsRepository stockHoldingsRepository;
    private final LoanRepository loanRepository;
    private final CapitalRepository capitalRepository;
    private final TurnRecordRepository turnRecordRepository;
    private final WarningRecordRepository warningRecordRepository;
    private final NextTurnRecordRepository nextTurnRecordRepository;
    private final QuestRepository questRepository;
    private final QuestHistoryRepository questHistoryRepository;

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
        Member member = memberRepository.findByUsername(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        AnimalType animalType = animalTypeRepository.findById(animalCreateRequest.getAnimalTypeId())
                .orElseThrow(() -> new CustomException(ANIMAL_TYPE_NOT_FOUND_EXCEPTION));

        if (animalRepository.existsByMemberAndIsEndFalse(member)) {
            throw new CustomException(ANIMAL_ALREADY_EXIST);
        }

        Animal animal = animalRepository.save(Animal.builder()
                .member(member)
                .animalType(animalType)
                .name(animalCreateRequest.getAnimalName())
                .turn(1L)
                .assets(1000000L)
                .credit(5L)
                .hierarchy(HierarchyStatus.PART_TIME.getHierarchyName())
                .isWorked(false)
                .isEnd(false)
                .questCleared(false)
                .build());

        // 턴 기록
        turnRecordRepository.save(TurnRecord.builder()
                .turnRecordTurn(1L)
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
                .build());

        // 고지서 기록
        warningRecordRepository.save(WarningRecord.builder()
                .warningRecordTurn(1L)
                .warningSavingsCount(0L)
                .warningLoanCount(0L)
                .depositTotal(0L)
                .depositRepay(0L)
                .savingsTotal(0L)
                .savingsRepay(0L)
                .stockTotal(0L)
                .stockRepay(0L)
                .animal(animal)
                .build());

        // 다음 턴 예상 지출 기록
        nextTurnRecordRepository.save(NextTurnRecord.builder()
                .nextTurnRecordTurn(2L)
                .nextSavingsRepayment(0L)
                .nextLoanRepayment(0L)
                .nextCapitalRepayment(0L)
                .animal(animal)
                .build());
    }

    @Override
    public AnimalPortfolioResponse getPortfolio(String memberId, Long animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (!animal.getMember().getUsername().equals(memberId)) {
            throw new CustomException(ANIMAL_UNAVAILABLE_EXCEPTION);
        }

        Portfolio portfolio = portfolioRepository.findByAnimal(animal)
                .orElseThrow(() -> new CustomException(PORTFOLIO_NOT_FOUND_EXCEPTION));

        return AnimalPortfolioResponse.builder()
                .animalName(animal.getName())
                .animalAsset(animal.getAssets())
                .animalCredit(animal.getCredit())
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
        Member member = memberRepository.findByUsername(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));

        Animal animal = animalRepository.findByMemberAndIsEndFalse(member)
                .orElseThrow(() -> new CustomException(ANIMAL_ALL_END_EXCEPTION));

        List<Deposit> deposit = depositRepository.findAllByAnimalAndDepositIsEndFalse(animal);
        Long depositTotal = deposit.stream()
                .map(Deposit::getDepositAmount)
                .reduce(0L, Long::sum);

        List<Savings> savings = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);
        Long savingsTotal = savings.stream()
                .map(Savings::getSavingsAmount)
                .reduce(0L, Long::sum);

        List<StockHoldings> stockHoldings = stockHoldingsRepository.findAllByAnimalAndStockIsSoldFalse(animal);
        Double stockTotal = stockHoldings.stream()
                .map(sh -> sh.getStockAveragePrice() * sh.getStockCount())
                .reduce(0.0, Double::sum);

        List<Loan> loan = loanRepository.findAllByAnimalAndLoanIsEndFalse(animal);
        Long loanTotal = loan.stream()
                .map(Loan::getLoanAmount)
                .reduce(0L, Long::sum);

        List<Capital> capital = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);
        Long capitalTotal = capital.stream()
                .map(Capital::getCapitalAmount)
                .reduce(0L, Long::sum);

        long allTotal = 0L;
        allTotal += animal.getAssets();
        allTotal += depositTotal;
        allTotal += savingsTotal;
        allTotal += loanTotal;
        allTotal += capitalTotal;

        return AnimalInfoResponse.builder()
                .animalName(animal.getName())
                .animalAbility(animal.getAnimalType().getAnimalAbility())
                .animalHierarchy(animal.getHierarchy())
                .animalCredit(animal.getCredit())
                .isSolvedQuizToday(member.getIsSolvedQuiz())
                .isWorkToday(animal.getIsWorked())
                .totalAmount(allTotal)
                .totalAssets(animal.getAssets())
                .totalDeposit(depositTotal)
                .totalSavings(savingsTotal)
                .totalStock(stockTotal)
                .totalLoan(loanTotal)
                .totalCapital(capitalTotal)
                .build();
    }

    @Override
    public AnimalQuestResponse getAnimalQuest(Long animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        List<Quest> questList = questRepository.findAll();

        List<QuestHistory> questHistoryList = questHistoryRepository.findAllByAnimalWithQuest(animal);

        Set<Long> completedQuestIds = questHistoryList.stream()
                .map(qh -> qh.getQuest().getId())
                .collect(Collectors.toSet());

        return AnimalQuestResponse.builder()
                .questList(questList.stream()
                        .map(quest -> AnimalQuestResponse.Quest.builder()
                                .name(quest.getName())
                                .completed(completedQuestIds.contains(quest.getId()))
                                .page(quest.getPage())
                                .build())
                        .toList())
                .build();
    }
}
