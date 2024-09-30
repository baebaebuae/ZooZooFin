package com.zzf.backend.domain.home.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.home.entity.WarningRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WarningRecordRepository extends JpaRepository<WarningRecord, Long> {
    Optional<WarningRecord> findByAnimalAndWarningRecordTurn(Animal animal, Long warningRecord);
}
