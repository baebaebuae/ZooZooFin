package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.Chart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChartRepository extends CrudRepository<Chart, Long> {
}
