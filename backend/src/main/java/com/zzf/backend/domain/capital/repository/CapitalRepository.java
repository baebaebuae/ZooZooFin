package com.zzf.backend.domain.capital.repository;

import com.zzf.backend.domain.capital.entity.Capital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapitalRepository extends JpaRepository<Capital, Long> {

}
