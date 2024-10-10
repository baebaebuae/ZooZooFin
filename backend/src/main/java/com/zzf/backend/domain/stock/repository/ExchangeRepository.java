package com.zzf.backend.domain.stock.repository;

import com.zzf.backend.domain.stock.entity.Exchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExchangeRepository extends JpaRepository<Exchange, Long> {
    Optional<Exchange> findByTurn(Long turn);
}
