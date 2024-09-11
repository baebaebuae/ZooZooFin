package com.zzf.backend.domain.bank.service;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.auth.repository.MemberRepository;
import com.zzf.backend.domain.bank.dto.MySavingsResponse;
import com.zzf.backend.domain.bank.dto.SavingsRequest;
import com.zzf.backend.domain.bank.dto.SavingsTypeResponse;
import com.zzf.backend.domain.bank.entity.Savings;
import com.zzf.backend.domain.bank.entity.SavingsType;
import com.zzf.backend.domain.bank.repository.SavingsRepository;
import com.zzf.backend.domain.bank.repository.SavingsTypeRepository;
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
public class SavingsServiceImpl implements SavingsService{

    private final SavingsRepository savingsRepository;
    private final SavingsTypeRepository savingsTypeRepository;
    private final CharacterRepository characterRepository;
    private final MemberRepository memberRepository;

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

    @Override
    @Transactional
    public void postSavings(SavingsRequest savingsRequest, String memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));
        SavingsType savingsType = savingsTypeRepository.findById(savingsRequest.getSavingsTypeId()).orElseThrow(() -> new CustomException(SAVINGS_TYPE_NOT_FOUND_EXCEPTION));

        long money = character.getCharacterAssets() - savingsRequest.getSavingsPayment();

        // 통장 잔고 부족
        if (money < 0){
            throw new CustomException(ACCOUNT_BALANCE_INSUFFICIENT_EXCEPTION);
        }

        // 적금 만들기
        Savings savings = Savings.builder()
                .savingsPayment(savingsRequest.getSavingsPayment())
                .savingsAmount(savingsRequest.getSavingsPayment())
                .savingsStartTurn(character.getCharacterTurn())
                .savingsEndTurn(character.getCharacterTurn() + savingsType.getSavingsPeriod())
                .savingsWarning(false)
                .savingsIsEnd(false)
                .build();

        savingsRepository.save(savings);

        // 캐릭터 가용 자산 감소
        character.changeCharacterAssets(money);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MySavingsResponse> getMySavings(String memberId) {
        // 빈 리스트 생성
        List<MySavingsResponse> mySavingsResponseList = new ArrayList<>();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        List<Savings> savingsList = savingsRepository.findByCharacterAndSavingsIsEndFalseOrderBySavingsEndTurnAsc(character);

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
                    .restTurn(savings.getSavingsEndTurn() - character.getCharacterTurn()) // (마감 턴) - (캐릭터 현재 턴)
                    .endTurn(savings.getSavingsEndTurn())
                    .warning(savings.getSavingsWarning())
                    .savingsName(savingsType.getSavingsName())
                    .savingsImgUrl(savingsType.getSavingsImgUrl())
                    .build();

            mySavingsResponseList.add(mySavingsResponse);
        }

        return mySavingsResponseList;
    }

    @Override
    public void deleteMySavings(String memberId, Long savingsId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(USER_NOT_FOUND_EXCEPTION));
        Character character = characterRepository.findByMemberAndCharacterIsEndFalse(member).orElseThrow(() -> new CustomException(CHARACTER_NOT_FOUND_EXCEPTION));

        Savings savings = savingsRepository.findById(savingsId).orElseThrow(() -> new CustomException(SAVINGS_NOT_FOUND_EXCEPTION));

        savings.changeSavingsIsEnd(true);
        character.changeCharacterAssets(character.getCharacterAssets() + savings.getSavingsAmount() / 200);
    }
}
