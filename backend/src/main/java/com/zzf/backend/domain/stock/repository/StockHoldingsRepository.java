package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.stock.entity.Stock;
import com.zzf.backend.domain.stock.entity.StockHoldings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockHoldingsRepository extends JpaRepository<StockHoldings, Long> {
    Optional<StockHoldings> findByStockAndAnimalAndStockIsSoldFalse(Stock stock, Animal animal);

    boolean existsByStockAndAnimalAndStockIsSoldFalse(Stock stock, Animal animal);

    List<StockHoldings> findAllByAnimalAndStockIsSoldFalse(Animal animal);

    List<StockHoldings> findAllByStockStockTypeAndAnimalAndStockIsSoldFalse(String stockType, Animal animal);

    boolean existsByAnimalAndStockIsSoldFalse(Animal animal);
}
