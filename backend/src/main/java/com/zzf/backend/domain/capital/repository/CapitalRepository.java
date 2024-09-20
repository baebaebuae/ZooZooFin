package com.zzf.backend.domain.capital.repository;

import com.zzf.backend.domain.capital.entity.Capital;
import com.zzf.backend.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CapitalRepository extends JpaRepository<Capital, Long> {

    List<Capital> findAllByAnimalAndCapitalIsEndFalse(Animal animal);
}
