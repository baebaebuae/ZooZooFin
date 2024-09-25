package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockHistoryRepository extends JpaRepository<StockHistory, Long> {
}
