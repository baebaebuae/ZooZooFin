package com.zzf.backend.domain.savings.service;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.auth.repository.MemberRepository;
import com.zzf.backend.domain.savings.dto.MySavingsResponse;
import com.zzf.backend.domain.savings.dto.SavingsRequest;
import com.zzf.backend.domain.savings.dto.SavingsTypeResponse;
import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.savings.entity.SavingsType;
import com.zzf.backend.domain.savings.repository.SavingsRepository;
import com.zzf.backend.domain.savings.repository.SavingsTypeRepository;
import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class SavingsServiceImpl implements SavingsService{

    private final SavingsRepository savingsRepository;
    private final SavingsTypeRepository savingsTypeRepository;
    private final AnimalRepository animalRepository;
    private final MemberRepository memberRepository;

    // 적금 상품 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<SavingsTypeResponse> getSavings() {
        // 빈 리스트 생성
        List<SavingsTypeResponse> savingsTypeResponseList = new ArrayList<>();

        List<SavingsType> savingsTypeList = savingsTypeRepository.findAll();

        for(SavingsType savingsType : savingsTypeList){
            SavingsTypeResponse savingsTypeResponse = SavingsTypeResponse.builder()
                    .savingsTypeId(savingsType.getSavingsTypeId())
                    .savingsPeriod(savingsType.getSavingsPeriod())
                    .savingsRate(savingsType.getSavingsRate())
                    .savingsName(savingsType.getSavingsName())
                    .SavingsImgUrl(savingsType.getSavingsImgUrl())
                    .build();

            savingsTypeResponseList.add(savingsTypeResponse);
        }

        return savingsTypeResponseList;
    }

    // 적금 신규 등록
    @Override
    @Transactional
    public void postSavings(SavingsRequest savingsRequest, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));
        SavingsType savingsType = savingsTypeRepository.findById(savingsRequest.getSavingsTypeId()).orElseThrow(() -> new CustomException(SAVINGS_TYPE_NOT_FOUND_EXCEPTION));

        // 현금 부족
        if (animal.getAnimalAssets() < savingsRequest.getSavingsPayment()){
            throw new CustomException(CASH_SHORTAGE_EXCEPTION);
        }

        // 적금 만들기
        Savings savings = Savings.builder()
                .savingsPayment(savingsRequest.getSavingsPayment())
                .savingsAmount(savingsRequest.getSavingsPayment())
                .savingsStartTurn(animal.getAnimalTurn())
                .savingsEndTurn(animal.getAnimalTurn() + savingsType.getSavingsPeriod())
                .savingsWarning(false)
                .savingsIsEnd(false)
                .animal(animal)
                .savingsType(savingsType)
                .build();

        savingsRepository.save(savings);

        // 캐릭터 가용 자산 감소
        animal.decreaseAnimalAssets(savingsRequest.getSavingsPayment());
    }

    // 내 적금 확인
    @Override
    @Transactional(readOnly = true)
    public List<MySavingsResponse> getMySavings(String memberId) {
        // 빈 리스트 생성
        List<MySavingsResponse> mySavingsResponseList = new ArrayList<>();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalseOrderBySavingsEndTurnAsc(animal);

        for (Savings savings : savingsList){
            SavingsType savingsType = savings.getSavingsType();

            // 만기 시 금액 계산
            long finalReturn = savings.getSavingsPayment() * savingsType.getSavingsPeriod();
            finalReturn = (savings.getSavingsWarning() ? finalReturn - savings.getSavingsPayment() : finalReturn);
            finalReturn += finalReturn * savingsType.getSavingsRate() / 100;

            MySavingsResponse mySavingsResponse = MySavingsResponse.builder()
                    .savingsId(savings.getSavingsId())
                    .name(savingsType.getSavingsName())
                    .period(savingsType.getSavingsPeriod())
                    .amount(savings.getSavingsAmount())
                    .payment(savings.getSavingsPayment())
                    .finalReturn(finalReturn) // 만기 시 금액
                    .restTurn(savings.getSavingsEndTurn() - animal.getAnimalTurn()) // (마감 턴) - (캐릭터 현재 턴)
                    .endTurn(savings.getSavingsEndTurn())
                    .warning(savings.getSavingsWarning())
                    .savingsName(savingsType.getSavingsName())
                    .savingsImgUrl(savingsType.getSavingsImgUrl())
                    .build();

            mySavingsResponseList.add(mySavingsResponse);
        }

        return mySavingsResponseList;
    }

    // 적금 중도 해지
    @Override
    @Transactional
    public void deleteMySavings(String memberId, Long savingsId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        Savings savings = savingsRepository.findById(savingsId).orElseThrow(() -> new CustomException(SAVINGS_NOT_FOUND_EXCEPTION));

        // 당일 취소 불가능
        if (savings.getSavingsStartTurn().equals(animal.getAnimalTurn())){
            throw new CustomException(SAME_DAY_CANCELLATION_NOT_ALLOWED);
        }

        savings.changeSavingsIsEnd(true);
        animal.increaseAnimalAssets( savings.getSavingsAmount() + savings.getSavingsAmount() / 200);
    }

    // 적금 다음날로 넘어가기
    @Override
    @Transactional
    public void savingsGoToNextTurn(Animal animal){
        // 캐릭터는 이미 다음턴으로 넘어온 상태

        // 진행 중인 적금 모두 조회
        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalse(animal);

        for (Savings savings : savingsList){

            // 적금이 만료된 경우 돈 반환
            if (savings.getSavingsEndTurn().equals(animal.getAnimalTurn())){
                savingsMature(savings, animal);
                continue;
            }

            long monthlyPayment = savings.getSavingsPayment();

            // 돈이 없는 경우
            if (animal.getAnimalAssets() < monthlyPayment){
                if (savings.getSavingsWarning()){
                    // 경고 받은 적있는 경우 강제 적금 해지
                    savings.changeSavingsIsEnd(true);
                    animal.increaseAnimalAssets( savings.getSavingsAmount() + savings.getSavingsAmount() / 200);
                }else{
                    // 경고 처음인 경우
                    savings.changeSavingsWarning(true);
                }
                continue;
            }

            // 적금에 돈 넣음
            savings.increaseSavingsAmount(monthlyPayment);
            // 현금 빠져나감
            animal.decreaseAnimalAssets(monthlyPayment);
        }
    }

    // 적금 만기
    @Override
    @Transactional
    public void savingsMature(Savings savings, Animal animal){
        savings.changeSavingsIsEnd(true);

        long money = savings.getSavingsAmount() + savings.getSavingsAmount() * savings.getSavingsType().getSavingsRate() / 100;

        // 예적금형 캐릭터인 경우 최종 수익 5% 추가 증가
        if (animal.getAnimalType().getAnimalTypeId() == 2) {
            money += money * 5 / 100;
        }
        animal.increaseAnimalAssets(money);

        // 예치 금액 5천만원 이상이면 신용도 1 증가
        if (savings.getSavingsAmount() >= 50000000){
            if (animal.getAnimalCredit() > 1){
                animal.changeAnimalCredit(animal.getAnimalCredit() + 1);
            }
        }

    }
}
