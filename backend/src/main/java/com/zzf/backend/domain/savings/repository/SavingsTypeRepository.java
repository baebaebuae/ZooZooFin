package com.zzf.backend.domain.savings.repository;

import com.zzf.backend.domain.savings.entity.SavingsType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavingsTypeRepository extends JpaRepository<SavingsType, Long> {
}
