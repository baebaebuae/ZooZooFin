package com.zzf.backend.domain.quest.repository;

import com.zzf.backend.domain.quest.entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {
    Optional<Quest> findByPage(String page);
}
