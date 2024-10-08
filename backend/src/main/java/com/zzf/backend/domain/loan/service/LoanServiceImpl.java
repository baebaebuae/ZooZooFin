package com.zzf.backend.domain.loan.service;

import com.zzf.backend.domain.home.entity.NextTurnRecord;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.repository.NextTurnRecordRepository;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.home.service.HomeService;
import com.zzf.backend.domain.loan.dto.LoanAvailableResponse;
import com.zzf.backend.domain.loan.dto.LoanRequest;
import com.zzf.backend.domain.loan.dto.MyLoanListResponse;
import com.zzf.backend.domain.loan.dto.MyLoanResponse;
import com.zzf.backend.domain.loan.entity.Loan;
import com.zzf.backend.domain.loan.repository.LoanRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class LoanServiceImpl implements LoanService {

    private final HomeService homeService;
    private final AnimalRepository animalRepository;
    private final LoanRepository loanRepository;
    private final TurnRecordRepository turnRecordRepository;
    private final NextTurnRecordRepository nextTurnRecordRepository;

    // 대출 가능 여부 체크
    @Override
    @Transactional(readOnly = true)
    public LoanAvailableResponse checkLoanAvailable(Long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        // 신용 등급이 7등급보다 낮은 경우
        if (animal.getCredit() > 6) {
            return LoanAvailableResponse.builder()
                    .characterCredit(animal.getCredit())
                    .isAvailable(false)
                    .build();
        }

        // 전 재산 계산
        long totalAssets = homeService.calculateTotalAssets(animal);

        if (totalAssets < 0) {
            return LoanAvailableResponse.builder()
                    .characterCredit(animal.getCredit())
                    .loanRate(animal.getCredit())
                    .isAvailable(false)
                    .build();
        }

        // 대출 한도
        long loanLimit = getLoanLimit(animal.getCredit(), totalAssets);

        // 실제 대출 가능 금액
        long loanAvailable = loanLimit - homeService.getMyRestLoans(animal);

        return LoanAvailableResponse.builder()
                .characterCredit(animal.getCredit())
                .isAvailable(loanAvailable >= 500000)
                .loanRate(animal.getCredit())
                .loanLimit(loanLimit)
                .loanAvailable(loanAvailable)
                .build();
    }

    // 대출 신규 등록
    @Override
    @Transactional
    public void postLoan(Long animalId, LoanRequest loanRequest) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        // 신용 등급이 낮을 경우 대출 불가
        if (animal.getCredit() > 6) {
            throw new CustomException(CREDIT_LOW);
        }

        Loan loan = Loan.builder()
                .loanType(loanRequest.getLoanType())
                .loanRate(animal.getCredit())
                .loanAmount(loanRequest.getLoanAmounts())
                .loanRemain(loanRequest.getLoanAmounts())
                .loanStartTurn(animal.getTurn())
                .loanPeriod(loanRequest.getLoanPeriod()) // 대출 기간
                .loanToEnd(loanRequest.getLoanPeriod()) // 남은 턴
                .loanWarning(false)
                .loanIsEnd(false)
                .animal(animal)
                .build();

        loanRepository.save(loan);

        // 캐릭터 가용 자산 증가
        animal.increaseAnimalAssets(loanRequest.getLoanAmounts());

        // 턴 기록에 추가
        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setLoanMake(turnRecord.getLoanMake() + loanRequest.getLoanAmounts());

        // 다음 턴 기록에 추가
        NextTurnRecord nextTurnRecord = nextTurnRecordRepository.findByAnimalAndNextTurnRecordTurn(animal, animal.getTurn() + 1).orElseThrow(() -> new CustomException(NEXT_TURN_RECORD_NOT_FOUND));
        nextTurnRecord.setNextLoanRepayment(nextTurnRecord.getNextLoanRepayment()
               - repay(loan.getLoanType(), loan.getLoanAmount(), loan.getLoanRate(), loan.getLoanPeriod(), 1));
    }

    // 내 대출 조회
    @Override
    @Transactional(readOnly = true)
    public MyLoanListResponse getMyLoan(Long animalId) {
        // 빈 리스트 생성
        List<MyLoanResponse> myLoanResponseList = new ArrayList<>();

        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        // 진행 중인 대출 모두 조회, 마감 턴 빠른 순으로 정렬
        List<Loan> loanList = loanRepository.findAllByAnimalAndLoanIsEndFalseOrderByLoanToEndAsc(animal);

        long count = 0;
        long totalLoan = 0;
        long restLoan = 0;
        for (Loan loan : loanList) {
            count++;
            totalLoan += loan.getLoanAmount();
            restLoan += loan.getLoanRemain();

            MyLoanResponse myLoanResponse = MyLoanResponse.builder()
                    .loanId(loan.getLoanId())
                    .loanNumber(count)
                    .loanRate(loan.getLoanRate())
                    .payBackTurn(loan.getLoanPeriod() - loan.getLoanToEnd())
                    .loanPeriod(loan.getLoanPeriod())
                    .loanAmount(loan.getLoanAmount())
                    .loanRemain(loan.getLoanRemain())
                    .loanType(loan.getLoanType())
                    .warning(loan.getLoanWarning())
                    .build();

            myLoanResponseList.add(myLoanResponse);
        }

        return MyLoanListResponse.builder()
                .totalLoan(totalLoan)
                .restLoan(restLoan)
                .myLoanList(myLoanResponseList)
                .build();
    }

    // 대출금 중도상환
    @Override
    @Transactional
    public void patchLoan(Long animalId, Long loanId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new CustomException(LOAN_NOT_FOUND_EXCEPTION));

        // 남은 금액에 1% 수수료 추가
        long restLoan = loan.getLoanRemain() + loan.getLoanRemain() / 100;

        // 캐릭터 현금이 부족한 경우
        if (animal.getAssets() < restLoan) {
            throw new CustomException(CASH_SHORTAGE_EXCEPTION);
        }

        // 캐릭터 현금 차감
        animal.decreaseAnimalAssets(restLoan);

        //대출 종료 처리
        loan.changeLoanIsEnd(true);

        // 턴 기록에 추가
        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setLoanRepay(turnRecord.getLoanRepay() - restLoan);

        // 다음 턴 기록에 추가
        NextTurnRecord nextTurnRecord = nextTurnRecordRepository.findByAnimalAndNextTurnRecordTurn(animal, animal.getTurn() + 1).orElseThrow(() -> new CustomException(NEXT_TURN_RECORD_NOT_FOUND));
        nextTurnRecord.setNextLoanRepayment(nextTurnRecord.getNextLoanRepayment()
                + repay(loan.getLoanType(), loan.getLoanAmount(), loan.getLoanRate(), loan.getLoanPeriod(), loan.getLoanPeriod() - loan.getLoanToEnd() + 1));
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

    // 대출 한도 비율, 밸런스 패치
    public long getLoanLimit(long characterCredit, long totalAssets) {
        return switch ((int) characterCredit) {
            case 1 -> {
                yield totalAssets * 6 / 10;
            }
            case 2 -> {
                yield totalAssets * 3 / 10;
            }
            case 3 -> {
                yield totalAssets * 2 / 10;
            }
            case 4 -> {
                yield totalAssets * 15 / 100;
            }
            case 5 -> {
                yield totalAssets * 12 / 100;
            }
            case 6 -> {
                yield totalAssets / 10;
            }
            default -> throw new CustomException(NO_SUCH_CREDIT_EXCEPTION);
        };
    }
}
