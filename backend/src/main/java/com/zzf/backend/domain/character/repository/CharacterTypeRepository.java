package com.zzf.backend.domain.character.repository;

import com.zzf.backend.domain.character.entity.CharacterType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterTypeRepository extends JpaRepository<CharacterType, Long> {
}
