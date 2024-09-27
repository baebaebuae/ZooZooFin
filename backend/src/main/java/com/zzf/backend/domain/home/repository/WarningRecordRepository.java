package com.zzf.backend.domain.home.repository;

import com.zzf.backend.domain.home.entity.WarningRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarningRecordRepository extends JpaRepository<WarningRecord, Long> {
}
