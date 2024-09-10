package com.zzf.backend.domain.character.repository;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    Character findByMemberAndCharacterIsEndFalse(Member member);
}
