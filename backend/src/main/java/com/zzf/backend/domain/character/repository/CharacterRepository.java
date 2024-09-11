package com.zzf.backend.domain.character.repository;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.domain.character.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {
    // member로 플레이중인 캐릭터 찾기
    Optional<Character> findByMemberAndCharacterIsEndFalse(Member member);
}
