package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.stock.entity.Stock;
import com.zzf.backend.domain.stock.entity.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockHistoryRepository extends JpaRepository<StockHistory, Long> {
    List<StockHistory> findAllByAnimalAndStockOrderByTurnDesc(Animal animal, Stock stock);
}
