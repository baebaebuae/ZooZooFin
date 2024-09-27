package com.zzf.backend.domain.home.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.home.entity.TurnRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TurnRecordRepository extends JpaRepository<TurnRecord, Long> {
    Optional<TurnRecord> findByAnimalAndTurnRecordTurn(Animal animal, Long turnRecord);
}
