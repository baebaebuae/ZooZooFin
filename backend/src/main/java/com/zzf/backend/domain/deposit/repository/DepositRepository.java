package com.zzf.backend.domain.deposit.repository;

import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Long> {
    // 캐릭터 마감 턴이 된 예금 모두 조회
    List<Deposit> findAllByAnimalAndDepositEndTurn(Animal animal, Long characterTurn);

    // 캐릭터 만기 안된 예금 모두 조회
    List<Deposit> findAllByAnimalAndDepositIsEndFalse(Animal animal);

    // 캐릭터 만기 안된 예금 모두 조회, 마감 턴 빠른 순으로 정렬
    List<Deposit> findAllByAnimalAndDepositIsEndFalseOrderByDepositEndTurnAsc(Animal animal);

}
