package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.StockHoldings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHoldingsRepository extends JpaRepository<StockHoldings, Long> {
}
