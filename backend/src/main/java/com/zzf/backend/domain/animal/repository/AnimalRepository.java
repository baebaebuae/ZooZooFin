package com.zzf.backend.domain.animal.repository;

import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findAllByMember(Member member);
    Optional<Animal> findByMemberAndAnimalIsEndFalse(Member member);
}
