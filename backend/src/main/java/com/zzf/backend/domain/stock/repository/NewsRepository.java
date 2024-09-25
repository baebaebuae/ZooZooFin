package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
}
