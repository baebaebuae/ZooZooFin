package com.zzf.backend.domain.portfolio.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByAnimal(Animal animal);
}
