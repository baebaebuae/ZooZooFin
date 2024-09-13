package com.zzf.backend.domain.deposit.service;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.auth.repository.MemberRepository;
import com.zzf.backend.domain.deposit.dto.DepositRequest;
import com.zzf.backend.domain.deposit.dto.DepositTypeResponse;
import com.zzf.backend.domain.deposit.dto.MyDepositResponse;
import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.deposit.entity.DepositType;
import com.zzf.backend.domain.character.entity.Character;
import com.zzf.backend.domain.character.repository.CharacterRepository;
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
    private final CharacterRepository characterRepository;
    private final MemberRepository memberRepository;

    // 예금 상품 목록 조회
    @Override
    @Transactional(readOnly = true)
    public List<DepositTypeResponse> getDeposit() {
        // 빈 리스트 생성
        List<DepositTypeResponse> depositTypeResponseList = new ArrayList<>();

        List<DepositType> depositTypeList = depositTypeRepository.findAll();

        for (DepositType depositType : depositTypeList){
            DepositTypeResponse depositTypeResponse = DepositTypeResponse.builder()
                    .depositTypeId(depositType.getDepositTypeId())
                    .depositPeriod(depositType.getDepositPeriod())
                    .depositRate(depositType.getDepositRate())
                    .depositName(depositType.getDepositName())
                    .depositImgUrl(depositType.getDepositImgUrl())
                    .build();

            depositTypeResponseList.add(depositTypeResponse);
        }
        return depositTypeResponseList;
    }

    // 예금 신규 등록
    @Override
    @Transactional
    public void postDeposit(DepositRequest depositRequest, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));
        DepositType depositType = depositTypeRepository.findById(depositRequest.getDepositTypeId()).orElseThrow(() -> new CustomException(DEPOSIT_TYPE_NOT_FOUND_EXCEPTION));

        // 통장 잔고 부족
        if (character.getCharacterAssets() < depositRequest.getDepositAmount()){
            throw new CustomException(ACCOUNT_BALANCE_INSUFFICIENT_EXCEPTION);
        }

        // 예금 만들기
        Deposit deposit = Deposit.builder()
                .depositAmount(depositRequest.getDepositAmount())
                .depositStartTurn(character.getCharacterTurn()) // ex) 시작턴 3턴
                .depositEndTurn(character.getCharacterTurn() + depositType.getDepositPeriod()) // ex) 끝턴 3턴 + 10턴 = 13턴
                .depositIsEnd(false)
                .character(character)
                .depositType(depositType)
                .build();

        depositRepository.save(deposit);

        // 캐릭터 가용 자산 감소
        character.decreaseCharacterAssets(depositRequest.getDepositAmount());
    }

    // 내 예금 조회
    @Override
    @Transactional(readOnly = true)
    public List<MyDepositResponse> getMyDeposit(String memberId) {
        // 빈 리스트 생성
        List<MyDepositResponse> myDepositResponseList = new ArrayList<>();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        List<Deposit> depositList = depositRepository.findAllByCharacterAndDepositIsEndFalseOrderByDepositEndTurnAsc(character);

        for (Deposit deposit : depositList){
            DepositType depositType = deposit.getDepositType();

            // 만기 시 금액 계산
            long finalReturn = deposit.getDepositAmount();
            finalReturn += finalReturn * depositType.getDepositRate() / 100;

            MyDepositResponse myDepositResponse = MyDepositResponse.builder()
                    .depositId(deposit.getDepositId())
                    .name(depositType.getDepositName())
                    .period(depositType.getDepositPeriod())
                    .amount(deposit.getDepositAmount())
                    .finalReturn(finalReturn) // 만기 시 금액
                    .restTurn(deposit.getDepositEndTurn() - character.getCharacterTurn()) // (마감 턴) - (캐릭터 현재 턴)
                    .endTurn(deposit.getDepositEndTurn())
                    .depositName(depositType.getDepositName())
                    .depositImgUrl(depositType.getDepositImgUrl())
                    .build();

            myDepositResponseList.add(myDepositResponse);
        }

        return myDepositResponseList;
    }

    // 예금 중도해지
    @Override
    @Transactional
    public void deleteMyDeposit(String memberId, Long depositId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        Deposit deposit = depositRepository.findById(depositId).orElseThrow(() -> new CustomException(DEPOSIT_NOT_FOUND_EXCEPTION));

        // 당일 취소 불가능
        if (deposit.getDepositStartTurn().equals(character.getCharacterTurn())){
            throw new CustomException(SAME_DAY_CANCELLATION_NOT_ALLOWED);
        }

        deposit.changeDepositIsEnd(true);
        character.increaseCharacterAssets( deposit.getDepositAmount() + deposit.getDepositAmount() / 200);
    }

    // 예금 만기
    @Override
    @Transactional
    public void depositMature(Long characterId) {
        Character character = characterRepository.findById(characterId).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        // 만기인 예금 모두 조회
        List<Deposit> depositList = depositRepository.findAllByCharacterAndDepositEndTurn(character, character.getCharacterTurn());

        for (Deposit deposit : depositList){
            deposit.changeDepositIsEnd(true);
            long money = deposit.getDepositAmount() + deposit.getDepositAmount() * deposit.getDepositType().getDepositRate() / 100;

            // 예적금형 캐릭터인 경우 최종 수익 5% 추가 증가
            if (character.getCharacterType().getCharacterTypeId() == 2){
                money += money * 5 / 100;
            }
            character.increaseCharacterAssets(money);
        }
    }

    // 전체 예금액 구하기
    @Override
    @Transactional(readOnly = true)
    public long getMyTotalDeposit(Long characterId){
        long money = 0L;
        Character character = characterRepository.findById(characterId).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        List<Deposit> depositList = depositRepository.findAllByCharacterAndDepositIsEndFalse(character);

        for (Deposit deposit : depositList){
            money += deposit.getDepositAmount();
        }

        return money;
    }
}
