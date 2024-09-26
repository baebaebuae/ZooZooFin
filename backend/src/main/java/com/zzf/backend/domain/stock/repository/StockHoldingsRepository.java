package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.stock.entity.StockHoldings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockHoldingsRepository extends JpaRepository<StockHoldings, Long> {
    List<StockHoldings> findAllByAnimalAndStockIsSoldFalse(Animal animal);
}
