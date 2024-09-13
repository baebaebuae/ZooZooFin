package com.zzf.backend.domain.deposit.repository;

import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Long> {
    // 캐릭터 마감 턴이 된 예금 모두 조회
    List<Deposit> findAllByCharacterAndDepositEndTurn(Character character, Long characterTurn);

    // 캐릭터 만기 안된 예금 모두 조회
    List<Deposit> findAllByCharacterAndDepositIsEndFalse(Character character);

    // 캐릭터 만기 안된 예금 모두 조회, 마감 턴 빠른 순으로 정렬
    List<Deposit> findAllByCharacterAndDepositIsEndFalseOrderByDepositEndTurnAsc(Character character);

}
