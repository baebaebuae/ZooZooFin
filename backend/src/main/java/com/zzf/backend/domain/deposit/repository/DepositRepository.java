package com.zzf.backend.domain.deposit.repository;

import com.zzf.backend.domain.deposit.entity.Deposit;
import com.zzf.backend.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Long> {

    boolean existsByAnimalAndDepositIsEndIsFalse(Animal animal);

    List<Deposit> findAllByAnimalAndDepositEndTurn(Animal animal, Long characterTurn);

    List<Deposit> findAllByAnimalAndDepositIsEndFalse(Animal animal);

    List<Deposit> findAllByAnimalAndDepositIsEndFalseOrderByDepositEndTurnAsc(Animal animal);

}
