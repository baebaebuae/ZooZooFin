package com.zzf.backend.domain.capital.service;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.capital.dto.CapitalRequest;
import com.zzf.backend.domain.capital.dto.CapitalResponse;
import com.zzf.backend.domain.capital.entity.Capital;
import com.zzf.backend.domain.capital.repository.CapitalRepository;
import com.zzf.backend.domain.home.entity.NextTurnRecord;
import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.repository.NextTurnRecordRepository;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class CapitalServiceImpl implements CapitalService{

    private final AnimalRepository animalRepository;
    private final CapitalRepository capitalRepository;
    private final TurnRecordRepository turnRecordRepository;
    private final NextTurnRecordRepository nextTurnRecordRepository;

    // 사채 대출 가능한지 확인
    @Override
    @Transactional(readOnly = true)
    public Boolean getCapitalExist(Long animalId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        return capitalRepository.existsByAnimalAndCapitalIsEndFalse(animal);
    }

    // 신규 사채 등록
    @Override
    @Transactional
    public void postCapital(Long animalId, CapitalRequest capitalRequest) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        if (capitalRepository.existsByAnimalAndCapitalIsEndFalse(animal)){
            throw new CustomException(CAPITAL_DUPLICATE_NOT_ALLOWED_EXCEPTION);
        }

        Capital capital = Capital.builder()
                .capitalAmount(capitalRequest.getCapitalAmounts())
                .capitalRemain(capitalRequest.getCapitalAmounts())
                .capitalStartTurn(animal.getTurn())
                .capitalEndTurn(animal.getTurn() + capitalRequest.getCapitalPeriod())
                .capitalIsEnd(false)
                .animal(animal)
                .build();

        capitalRepository.save(capital);

        // 캐릭터 가용 자산 증가. 선이자 제외.
        animal.increaseAnimalAssets(capitalRequest.getCapitalAmounts() * 9 / 10);

        // 캐릭터 신용도 3단계 감소
        if (animal.getCredit() < 8){
            animal.changeAnimalCredit(animal.getCredit() + 3);
        }else{
            animal.changeAnimalCredit(10L);
        }

        // 턴 기록 추가
        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setCapitalMake(turnRecord.getCapitalMake() + capitalRequest.getCapitalAmounts() * 9 / 10);
    }

    // 내 사채 조회
    @Override
    @Transactional(readOnly = true)
    public CapitalResponse getMyCapital(Long animalId){
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        List<Capital> capitalList = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);

        CapitalResponse capitalResponse = CapitalResponse.builder().build();

        for (Capital capital : capitalList){
            capitalResponse.setCapitalOrigin(capital.getCapitalAmount());
            capitalResponse.setCapitalRestMoney(capital.getCapitalRemain());
            capitalResponse.setCapitalRestTurn(capital.getCapitalEndTurn() - animal.getTurn());
            capitalResponse.setCapitalEndTurn(capital.getCapitalEndTurn());
        }

        return capitalResponse;
    }

    // 사채 상환
    @Override
    @Transactional
    public void patchCapital(Long animalId, Long money) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        List<Capital> capitalList = capitalRepository.findAllByAnimalAndCapitalIsEndFalse(animal);

        for (Capital capital : capitalList){

            if (animal.getAssets() < money){
                // 현금 없는 경우
                throw new CustomException(CASH_SHORTAGE_EXCEPTION);
            }

            if (!capital.getCapitalRemain().equals(money)){
                // 입력값이 대출금과 다른 경우
                throw new CustomException(EARLY_REPAYMENT_NOT_ALLOWED_EXCEPTION);
            }

            capital.changeCapitalRemain(0L);
            capital.changeCapitalIsEnd(true);

            animal.decreaseAnimalAssets(money);

            TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
            turnRecord.setCapitalRepay(0L);

            NextTurnRecord nextTurnRecord = nextTurnRecordRepository.findByAnimalAndNextTurnRecordTurn(animal, animal.getTurn() + 1).orElseThrow(() -> new CustomException(NEXT_TURN_RECORD_NOT_FOUND));
            nextTurnRecord.setNextCapitalRepayment(0L);
        }
    }
}
