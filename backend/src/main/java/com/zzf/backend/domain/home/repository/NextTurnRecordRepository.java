package com.zzf.backend.domain.home.repository;

import com.zzf.backend.domain.home.entity.NextTurnRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NextTurnRecordRepository extends JpaRepository<NextTurnRecord, Long> {
}
