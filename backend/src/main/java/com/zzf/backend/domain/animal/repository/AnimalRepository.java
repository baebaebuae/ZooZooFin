package com.zzf.backend.domain.animal.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.global.auth.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    boolean existsByMemberAndIsEndFalse(Member member);

    List<Animal> findAllByMemberAndIsEndTrue(Member member);

    Optional<Animal> findByMemberAndIsEndFalse(Member member);
}
