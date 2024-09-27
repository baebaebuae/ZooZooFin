package com.zzf.backend.domain.home.repository;

import com.zzf.backend.domain.home.entity.TurnRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurnRecordRepository extends JpaRepository<TurnRecord, Long> {
}
