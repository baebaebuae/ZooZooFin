package com.zzf.backend.domain.savings.repository;

import com.zzf.backend.domain.savings.entity.Savings;
import com.zzf.backend.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, Long> {

    boolean existsByAnimalAndSavingsIsEndIsFalse(Animal animal);

    List<Savings> findAllByAnimalAndSavingsEndTurn(Animal animal, Long characterTurn);

    List<Savings> findAllByAnimalAndSavingsIsEndFalse(Animal animal);

    List<Savings> findAllByAnimalAndSavingsIsEndFalseOrderBySavingsEndTurnAsc(Animal animal);
}
