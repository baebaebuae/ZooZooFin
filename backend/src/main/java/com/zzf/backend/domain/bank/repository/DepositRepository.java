package com.zzf.backend.domain.bank.repository;

import com.zzf.backend.domain.bank.entity.Deposit;
import com.zzf.backend.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Long> {
    List<Deposit> findByCharacterAndDepositIsEndFalseOrderByDepositEndTurnAsc(Character character);
}
