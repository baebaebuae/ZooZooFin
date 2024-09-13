package com.zzf.backend.domain.deposit.repository;

import com.zzf.backend.domain.deposit.entity.DepositType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepositTypeRepository extends JpaRepository<DepositType, Long> {
}
