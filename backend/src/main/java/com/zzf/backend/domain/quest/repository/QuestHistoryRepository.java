package com.zzf.backend.domain.quest.repository;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.quest.entity.QuestHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestHistoryRepository extends JpaRepository<QuestHistory, Long> {
    @Query("select qh from QuestHistory qh join fetch qh.quest where qh.animal = :animal")
    List<QuestHistory> findAllByAnimalWithQuest(Animal animal);
}
