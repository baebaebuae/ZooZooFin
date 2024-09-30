package com.zzf.backend.domain.deposit.service;

import com.zzf.backend.domain.home.entity.TurnRecord;
import com.zzf.backend.domain.home.repository.TurnRecordRepository;
import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.domain.member.repository.MemberRepository;
import com.zzf.backend.domain.deposit.dto.DepositRequest;
import com.zzf.backend.domain.deposit.dto.DepositTypeResponse;
import com.zzf.backend.domain.deposit.dto.MyDepositResponse;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.deposit.entity.DepositType;
import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.deposit.repository.DepositRepository;
import com.zzf.backend.domain.deposit.repository.DepositTypeRepository;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class DepositServiceImpl implements DepositService {

    private final DepositRepository depositRepository;
    private final DepositTypeRepository depositTypeRepository;
    private final AnimalRepository animalRepository;
    private final TurnRecordRepository turnRecordRepository;

    // 예금 상품 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<DepositTypeResponse> getDeposit() {
        // 빈 리스트 생성
        List<DepositTypeResponse> depositTypeResponseList = new ArrayList<>();

        List<DepositType> depositTypeList = depositTypeRepository.findAll();

        for (DepositType depositType : depositTypeList) {
            DepositTypeResponse depositTypeResponse = DepositTypeResponse.builder()
                    .typeId(depositType.getDepositTypeId())
                    .period(depositType.getDepositPeriod())
                    .rate(depositType.getDepositRate())
                    .name(depositType.getDepositName())
                    .imgUrl(depositType.getDepositImgUrl())
                    .build();

            depositTypeResponseList.add(depositTypeResponse);
        }
        return depositTypeResponseList;
    }

    // 예금 신규 등록
    @Override
    @Transactional
    public void postDeposit(Long animalId, DepositRequest depositRequest) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));
        DepositType depositType = depositTypeRepository.findById(depositRequest.getTypeId()).orElseThrow(() -> new CustomException(DEPOSIT_TYPE_NOT_FOUND_EXCEPTION));

        // 현금 부족
        if (animal.getAnimalAssets() < depositRequest.getMoney()) {
            throw new CustomException(CASH_SHORTAGE_EXCEPTION);
        }

        // 예금 만들기
        Deposit deposit = Deposit.builder()
                .depositAmount(depositRequest.getMoney())
                .depositStartTurn(animal.getAnimalTurn()) // ex) 시작턴 3턴
                .depositEndTurn(animal.getAnimalTurn() + depositType.getDepositPeriod()) // ex) 끝턴 3턴 + 10턴 = 13턴
                .depositIsEnd(false)
                .animal(animal)
                .depositType(depositType)
                .build();

        depositRepository.save(deposit);

        // 캐릭터 가용 자산 감소
        animal.decreaseAnimalAssets(depositRequest.getMoney());

        // 턴 기록에 추가
        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getAnimalTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setDepositMake(turnRecord.getDepositMake() - depositRequest.getMoney());
    }

    // 내 예금 조회
    @Override
    @Transactional(readOnly = true)
    public List<MyDepositResponse> getMyDeposit(Long animalId) {
        // 빈 리스트 생성
        List<MyDepositResponse> myDepositResponseList = new ArrayList<>();

        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));
        List<Deposit> depositList = depositRepository.findAllByAnimalAndDepositIsEndFalseOrderByDepositEndTurnAsc(animal);

        for (Deposit deposit : depositList) {
            DepositType depositType = deposit.getDepositType();

            // 만기 시 금액 계산
            long finalReturn = deposit.getDepositAmount();
            finalReturn += finalReturn * depositType.getDepositRate() / 100;

            MyDepositResponse myDepositResponse = MyDepositResponse.builder()
                    .depositId(deposit.getDepositId())
                    .name(depositType.getDepositName())
                    .period(depositType.getDepositPeriod())
                    .amount(deposit.getDepositAmount())
                    .rate(depositType.getDepositRate())
                    .finalReturn(finalReturn) // 만기 시 금액
                    .deleteReturn(deposit.getDepositAmount() + deposit.getDepositAmount() / 200) // 해지시 금액
                    .restTurn(deposit.getDepositEndTurn() - animal.getAnimalTurn()) // (마감 턴) - (캐릭터 현재 턴)
                    .endTurn(deposit.getDepositEndTurn())
                    .depositImgUrl(depositType.getDepositImgUrl())
                    .build();

            myDepositResponseList.add(myDepositResponse);
        }

        return myDepositResponseList;
    }

    // 예금 중도해지
    @Override
    @Transactional
    public void deleteMyDeposit(Long animalId, Long depositId) {
        Animal animal = animalRepository.findById(animalId).orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));
        Deposit deposit = depositRepository.findById(depositId).orElseThrow(() -> new CustomException(DEPOSIT_NOT_FOUND_EXCEPTION));

        // 당일 취소 불가능
        if (deposit.getDepositStartTurn().equals(animal.getAnimalTurn())) {
            throw new CustomException(SAME_DAY_CANCELLATION_NOT_ALLOWED);
        }

        // 예금 완료 처리
        deposit.changeDepositIsEnd(true);
        animal.increaseAnimalAssets(deposit.getDepositAmount() + deposit.getDepositAmount() / 200);

        // 턴 기록에 추가
        TurnRecord turnRecord = turnRecordRepository.findByAnimalAndTurnRecordTurn(animal, animal.getAnimalTurn()).orElseThrow(() -> new CustomException(TURN_RECORD_NOT_FOUND));
        turnRecord.setDepositFinish(turnRecord.getDepositFinish() + deposit.getDepositAmount() + deposit.getDepositAmount() / 200);

    }
}
