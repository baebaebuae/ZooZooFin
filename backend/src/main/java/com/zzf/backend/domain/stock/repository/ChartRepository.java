package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.Chart;
import com.zzf.backend.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChartRepository extends JpaRepository<Chart, Long> {
    Optional<Chart> findByStockAndChartTurn(Stock stock, Long chartTurn);
}
