package com.zzf.backend.domain.savings.service;

import com.zzf.backend.domain.home.entity.NextTurnRecord;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.repository.NextTurnRecordRepository;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
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
public class SavingsServiceImpl implements SavingsService {

    private final SavingsRepository savingsRepository;
    private final SavingsTypeRepository savingsTypeRepository;
    private final AnimalRepository animalRepository;
    private final TurnRecordRepository turnRecordRepository;
    private final NextTurnRecordRepository nextTurnRecordRepository;

    // 적금 상품 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<SavingsTypeResponse> getSavings() {
        // 빈 리스트 생성
        List<SavingsTypeResponse> savingsTypeResponseList = new ArrayList<>();

        List<SavingsType> savingsTypeList = savingsTypeRepository.findAll();

        for (SavingsType savingsType : savingsTypeList) {
            SavingsTypeResponse savingsTypeResponse = SavingsTypeResponse.builder()
                    .typeId(savingsType.getSavingsTypeId())
                    .period(savingsType.getSavingsPeriod())
                    .rate(savingsType.getSavingsRate())
                    .name(savingsType.getSavingsName())
                    .imgUrl(savingsType.getSavingsImgUrl())
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
        SavingsType savingsType = savingsTypeRepository.findById(savingsRequest.getTypeId()).orElseThrow(() -> new CustomException(SAVINGS_TYPE_NOT_FOUND_EXCEPTION));

        // 현금 부족
        if (animal.getAssets() < savingsRequest.getMoney()) {
            throw new CustomException(CASH_SHORTAGE_EXCEPTION);
        }

        // 적금 만들기
        Savings savings = Savings.builder()
                .savingsPayment(savingsRequest.getMoney())
                .savingsAmount(savingsRequest.getMoney())
                .savingsInterest(0L)
                .savingsStartTurn(animal.getTurn())
                .savingsEndTurn(animal.getTurn() + savingsType.getSavingsPeriod())
                .savingsWarning(false)
                .savingsIsEnd(false)
                .animal(animal)
                .savingsType(savingsType)
                .build();

        savingsRepository.save(savings);

        // 캐릭터 가용 자산 감소
        animal.decreaseAnimalAssets(savingsRequest.getMoney());

        // 턴 기록에 추가
        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setSavingsMake(turnRecord.getSavingsMake() - savingsRequest.getMoney());

        // 다음 턴 기록에도 추가
        NextTurnRecord nextTurnRecord = nextTurnRecordRepository.findByAnimalAndNextTurnRecordTurn(animal, animal.getTurn() + 1).orElseThrow(() -> new CustomException(NEXT_TURN_RECORD_NOT_FOUND));
        nextTurnRecord.setNextSavingsRepayment(nextTurnRecord.getNextSavingsRepayment() - savingsRequest.getMoney());
    }

    // 내 적금 확인
    @Override
    @Transactional(readOnly = true)
    public List<MySavingsResponse> getMySavings(Long animalId) {
        // 빈 리스트 생성
        List<MySavingsResponse> mySavingsResponseList = new ArrayList<>();

        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        List<Savings> savingsList = savingsRepository.findAllByAnimalAndSavingsIsEndFalseOrderBySavingsEndTurnAsc(animal);

        for (Savings savings : savingsList) {
            SavingsType savingsType = savings.getSavingsType();

            // 만기 시 예상 금액 계산
            double rate = ((double) savingsType.getSavingsRate() / savingsType.getSavingsPeriod()) / 100;
            long a = (savingsType.getSavingsPeriod()) * (savingsType.getSavingsPeriod() + 1) / 2;
            long finalReturn = savings.getSavingsPayment() * savingsType.getSavingsPeriod() + (long) Math.ceil(savings.getSavingsPayment() * a * rate);

            MySavingsResponse mySavingsResponse = MySavingsResponse.builder()
                    .savingsId(savings.getSavingsId())
                    .name(savingsType.getSavingsName())
                    .period(savingsType.getSavingsPeriod())
                    .amount(savings.getSavingsAmount())
                    .rate(savingsType.getSavingsRate())
                    .payment(savings.getSavingsPayment())
                    .finalReturn(finalReturn) // 만기 시 금액
                    .deleteReturn(savings.getSavingsAmount() + savings.getSavingsAmount() / 200) // 해지 시 금액
                    .restTurn(savings.getSavingsEndTurn() - animal.getTurn()) // (마감 턴) - (캐릭터 현재 턴)
                    .endTurn(savings.getSavingsEndTurn())
                    .warning(savings.getSavingsWarning())
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
        if (savings.getSavingsStartTurn().equals(animal.getTurn())) {
            throw new CustomException(SAME_DAY_CANCELLATION_NOT_ALLOWED);
        }

        savings.changeSavingsIsEnd(true);
        animal.increaseAnimalAssets(savings.getSavingsAmount() + savings.getSavingsAmount() / 200);

        // 턴 기록에 추가
        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setSavingsFinish(turnRecord.getSavingsFinish() + savings.getSavingsAmount() + savings.getSavingsAmount() / 200);

        if (animal.getTurn() + 1 != savings.getSavingsEndTurn()) {
            // 다음 턴이 만기가 아닌 경우, 다음 턴 기록에서 repayment 빼기
            NextTurnRecord nextTurnRecord = nextTurnRecordRepository.findByAnimalAndNextTurnRecordTurn(animal, animal.getTurn() + 1).orElseThrow(() -> new CustomException(NEXT_TURN_RECORD_NOT_FOUND));
            nextTurnRecord.setNextSavingsRepayment(nextTurnRecord.getNextSavingsRepayment() + savings.getSavingsPayment());
        }
    }
}
