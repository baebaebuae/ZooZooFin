package com.zzf.backend.domain.loan.service;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.auth.repository.MemberRepository;
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
public class LoanServiceImpl implements LoanService{

    private final HomeService homeService;
    private final MemberRepository memberRepository;
    private final AnimalRepository animalRepository;
    private final LoanRepository loanRepository;

    // 대출 가능 여부 체크
    @Override
    @Transactional(readOnly = true)
    public LoanAvailableResponse checkLoanAvailable(String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        // 신용 등급이 7등급보다 낮은 경우
        if (animal.getAnimalCredit() > 6){
            return LoanAvailableResponse.builder()
                    .characterCredit(animal.getAnimalCredit())
                    .isAvailable(false)
                    .build();
        }

        // 전 재산 계산
        long totalAssets = homeService.calculateTotalAssets(animal);

        if (totalAssets < 0){
            return LoanAvailableResponse.builder()
                    .characterCredit(animal.getAnimalCredit())
                    .loanRate(animal.getAnimalCredit())
                    .isAvailable(false)
                    .build();
        }

        // 대출 한도
        long loanLimit = getLoanLimit(animal.getAnimalCredit(), totalAssets);

        // 실제 대출 가능 금액
        long loanAvailable = loanLimit - homeService.getMyRestLoans(animal);

        return LoanAvailableResponse.builder()
                .characterCredit(animal.getAnimalCredit())
                .isAvailable(loanAvailable >= 500000)
                .loanRate(animal.getAnimalCredit())
                .loanLimit(loanLimit)
                .loanAvailable(loanAvailable)
                .build();
    }

    // 대출 신규 등록
    @Override
    @Transactional
    public void postLoan(LoanRequest loanRequest, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        // 신용 등급이 낮을 경우 대출 불가
        if (animal.getAnimalCredit() > 6){
            throw new CustomException(CREDIT_LOW);
        }

        Loan loan = Loan.builder()
                .loanType(loanRequest.getLoanType())
                .loanRate(animal.getAnimalCredit())
                .loanAmount(loanRequest.getLoanAmounts())
                .loanRemain(loanRequest.getLoanAmounts())
                .loanStartTurn(animal.getAnimalTurn())
                .loanPeriod(loanRequest.getLoanPeriod())
                .loanToEnd(loanRequest.getLoanPeriod())
                .loanWarning(false)
                .loanIsEnd(false)
                .build();

        loanRepository.save(loan);
    }

    // 내 대출 조회
    @Override
    public MyLoanListResponse getMyLoan(String memberId) {
        // 빈 리스트 생성
        List<MyLoanResponse> myLoanResponseList = new ArrayList<>();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        // 진행 중인 대출 모두 조회, 마감 턴 빠른 순으로 정렬
        List<Loan> loanList = loanRepository.findAllByAnimalAndLoanIsEndFalseOrderByLoanToEndAsc(animal);

        long count = 0;
        long totalLoan = 0;
        long restLoan = 0;
        for (Loan loan : loanList){
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
    public void patchLoan(Long loanId, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));
        Loan loan = loanRepository.findById(loanId).orElseThrow(() -> new CustomException(LOAN_NOT_FOUND_EXCEPTION));

        // 남은 금액에 1% 수수료 추가
        long restLoan = loan.getLoanRemain() + loan.getLoanRemain() / 100;

        // 캐릭터 현금이 부족한 경우
        if (animal.getAnimalAssets() < restLoan){
            throw new CustomException(CASH_SHORTAGE_EXCEPTION);
        }

        // 캐릭터 현금 차감
        animal.decreaseAnimalAssets(restLoan);

        //완료 처리
        loan.changeLoanIsEnd(true);
    }

    // 대출 다음날로 넘어가기
    @Override
    @Transactional
    public void loanGoToNextTurn(Animal animal){

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

    // 대출 한도 비율, 밸런스 패치
    public long getLoanLimit(long characterCredit, long totalAssets){
        return switch ((int) characterCredit){
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
            default ->
                    throw new CustomException(NO_SUCH_CREDIT_EXCEPTION);
        };
    }
}
