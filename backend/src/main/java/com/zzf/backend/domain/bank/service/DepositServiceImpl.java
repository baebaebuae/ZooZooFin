package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.auth.repository.MemberRepository;
import com.zzf.backend.domain.bank.dto.DepositRequest;
import com.zzf.backend.domain.bank.dto.DepositTypeResponse;
import com.zzf.backend.domain.bank.dto.MyDepositResponse;
import com.zzf.backend.domain.bank.entity.Deposit;
import com.zzf.backend.domain.bank.entity.DepositType;
import com.zzf.backend.domain.bank.repository.*;
import com.zzf.backend.domain.character.entity.Character;
import com.zzf.backend.domain.character.repository.CharacterRepository;
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

    @Override
    @Transactional
    public void postDeposit(DepositRequest depositRequest, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));
        DepositType depositType = depositTypeRepository.findById(depositRequest.getDepositTypeId()).orElseThrow(() -> new CustomException(DEPOSIT_TYPE_NOT_FOUND_EXCEPTION));

        long money = character.getCharacterAssets() - depositRequest.getDepositAmount();

        // 통장 잔고 부족
        if (money < 0){
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
        character.changeCharacterAssets(money);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MyDepositResponse> getMyDeposit(String memberId) {
        // 빈 리스트 생성
        List<MyDepositResponse> myDepositResponseList = new ArrayList<>();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        List<Deposit> depositList = depositRepository.findByCharacterAndDepositIsEndFalseOrderByDepositEndTurnAsc(character);

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

    @Override
    @Transactional
    public void deleteMyDeposit(String memberId, Long depositId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        Deposit deposit = depositRepository.findById(depositId).orElseThrow(() -> new CustomException(DEPOSIT_NOT_FOUND_EXCEPTION));

        deposit.changeDepositIsEnd(true);
        character.changeCharacterAssets(character.getCharacterAssets() + deposit.getDepositAmount() / 200);
    }
}
