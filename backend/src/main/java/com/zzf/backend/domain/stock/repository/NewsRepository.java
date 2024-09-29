package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.News;
import com.zzf.backend.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findAllByStockAndTurn(Stock stock, Long turn);
}
