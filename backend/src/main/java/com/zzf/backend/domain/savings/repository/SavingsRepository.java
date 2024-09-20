package com.zzf.backend.domain.savings.repository;

import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, Long> {
    // 캐릭터 마감 턴이 된 적금 모두 조회
    List<Savings> findAllByAnimalAndSavingsEndTurn(Animal animal, Long characterTurn);

    // 캐릭터 만기 안된 적금 모두 조회
    List<Savings> findAllByAnimalAndSavingsIsEndFalse(Animal animal);

    // 캐릭터 만기 안된 적금 모두 조회, 마감 턴 빠른 순으로 정렬
    List<Savings> findAllByAnimalAndSavingsIsEndFalseOrderBySavingsEndTurnAsc(Animal animal);
}
