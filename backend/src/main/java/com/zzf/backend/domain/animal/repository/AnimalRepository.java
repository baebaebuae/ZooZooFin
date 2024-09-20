package com.zzf.backend.domain.animal.repository;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    // member로 플레이중인 캐릭터 찾기
    Optional<Animal> findByMemberAndAnimalIsEndFalse(Member member);
}
