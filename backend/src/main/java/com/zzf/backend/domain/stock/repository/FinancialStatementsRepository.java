package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.FinancialStatements;
import com.zzf.backend.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FinancialStatementsRepository extends JpaRepository<FinancialStatements, Long> {
    Optional<FinancialStatements> findByStockAndPeriod(Stock stock, Long period);
}
