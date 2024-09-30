package com.zzf.backend.domain.home.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.home.entity.NextTurnRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NextTurnRecordRepository extends JpaRepository<NextTurnRecord, Long> {
    Optional<NextTurnRecord> findByAnimalAndNextTurnRecordTurn(Animal animal, Long nextTurnRecord);
}
