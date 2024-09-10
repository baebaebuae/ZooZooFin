package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.auth.repository.MemberRepository;
import com.zzf.backend.domain.bank.dto.DepositRequest;
import com.zzf.backend.domain.bank.dto.DepositResponse;
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

import static com.zzf.backend.global.status.ErrorCode.CHARACTER_NOT_FOUND_EXCEPTION;
import static com.zzf.backend.global.status.ErrorCode.USER_NOT_FOUND_EXCEPTION;

@Service
@RequiredArgsConstructor
public class DepositServiceImpl implements DepositService {
    private final DepositRepository depositRepository;
    private final DepositTypeRepository depositTypeRepository;
    private final CharacterRepository characterRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DepositResponse> getDeposit() {
        // 빈 리스트 생성
        List<DepositResponse> depositResponseList = new ArrayList<>();

        List<DepositType> depositTypeList = depositTypeRepository.findAll();

        for (DepositType depositType : depositTypeList){
            DepositResponse depositResponse = DepositResponse.builder()
                    .depositTypeId(depositType.getDepositTypeId())
                    .depositPeriod(depositType.getDepositPeriod())
                    .depositRate(depositType.getDepositRate())
                    .depositName(depositType.getDepositName())
                    .depositImgUrl(depositType.getDepositImgUrl())
                    .build();

            depositResponseList.add(depositResponse);
        }
        return depositResponseList;
    }

    @Override
    @Transactional
    public void postDeposit(DepositRequest depositRequest, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member);
        DepositType depositType = depositTypeRepository.findById(depositRequest.getDepositTypeId()).orElseThrow();

        if (character == null){
            throw new CustomException(CHARACTER_NOT_FOUND_EXCEPTION);
        }

        Deposit deposit = Deposit.builder()
                .character(character)
                .depositType(depositType)
                .depositAmount(depositRequest.getDepositAmount())
                .depositStartTurn(character.getCharacterTurn()) // ex) 시작턴 3턴
                .depositEndTurn(character.getCharacterTurn() + depositType.getDepositPeriod()) // ex) 끝턴 3턴 + 10턴 = 13턴
                .depositIsEnd(false)
                .build();

        depositRepository.save(deposit);
    }

    @Override
    public List<MyDepositResponse> getMyDeposit(String memberId) {
        return List.of();
    }

    @Override
    public void deleteMyDeposit(Long depositId) {

    }
}
