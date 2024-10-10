package com.zzf.backend.domain.quest.entity;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "quest_history")
@NoArgsConstructor
public class QuestHistory extends BaseEntity {

    @Id
    @Column(name = "quest_history_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quest_id")
    private Quest quest;

    @Builder
    public QuestHistory(Animal animal, Quest quest) {
        this.animal = animal;
        this.quest = quest;
    }
}
