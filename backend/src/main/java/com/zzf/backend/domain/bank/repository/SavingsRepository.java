package com.zzf.backend.domain.bank.repository;

import com.zzf.backend.domain.bank.entity.Savings;
import com.zzf.backend.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, Long> {
    List<Savings> findByCharacterAndSavingsIsEndFalseOrderBySavingsEndTurnAsc(Character character);
}
