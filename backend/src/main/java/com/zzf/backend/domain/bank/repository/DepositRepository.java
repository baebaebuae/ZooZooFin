package com.zzf.backend.domain.bank.repository;

import com.zzf.backend.domain.bank.entity.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepositRepository extends JpaRepository<Deposit, Integer> {
}
