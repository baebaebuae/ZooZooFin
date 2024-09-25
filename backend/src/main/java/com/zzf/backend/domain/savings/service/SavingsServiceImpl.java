package com.zzf.backend.domain.savings.service;

import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.domain.member.repository.MemberRepository;
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
    public void postSavings(Long animalId, SavingsRequest savingsRequest) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));
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

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

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
    public void deleteMySavings(Long animalId, Long savingsId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        Savings savings = savingsRepository.findById(savingsId).orElseThrow(() -> new CustomException(SAVINGS_NOT_FOUND_EXCEPTION));

        // 당일 취소 불가능
        if (savings.getSavingsStartTurn().equals(animal.getAnimalTurn())){
            throw new CustomException(SAME_DAY_CANCELLATION_NOT_ALLOWED);
        }

        savings.changeSavingsIsEnd(true);
        animal.increaseAnimalAssets( savings.getSavingsAmount() + savings.getSavingsAmount() / 200);
    }
}
