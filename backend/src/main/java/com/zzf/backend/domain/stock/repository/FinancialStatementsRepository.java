package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.FinancialStatements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialStatementsRepository extends JpaRepository<FinancialStatements, Long> {
}
