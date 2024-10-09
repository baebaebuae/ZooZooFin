package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.CreationUnit;
import com.zzf.backend.domain.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CreationUnitRepository extends JpaRepository<CreationUnit, Long> {
    List<CreationUnit> findAllByStockOrderByElemPercentageDesc(Stock stock);
}
