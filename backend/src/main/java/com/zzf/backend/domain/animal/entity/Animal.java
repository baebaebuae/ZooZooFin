package com.zzf.backend.domain.animal.entity;

import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "animal")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Animal extends BaseEntity {

    @Id
    @Column(name = "animal_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_type_id")
    @NotNull
    private AnimalType animalType;

    @NotNull
    @Column(name = "animal_name")
    private String animalName;

    @NotNull
    @Column(name = "animal_turn")
    private Long animalTurn;

    @NotNull
    @Column(name = "animal_assets")
    private Long animalAssets;

    @NotNull
    @Column(name = "animal_credit")
    private Long animalCredit;

    @NotNull
    @Column(name = "animal_hierarchy")
    private Long animalHierarchy;

    @NotNull
    @Column(name = "animal_is_work")
    private Boolean animalIsWork;

    @NotNull
    @Column(name = "animal_is_end")
    private Boolean animalIsEnd;

    @NotNull
    @Column(name = "animal_quest_cleared")
    private Boolean animalQuestCleared;

    @Builder
    public Animal(Member member, AnimalType animalType, String animalName, Long animalTurn, Long animalAssets, Long animalCredit, Long animalHierarchy, Boolean animalIsWork, Boolean animalIsEnd, Boolean animalQuestCleared) {
        this.member = member;
        this.animalType = animalType;
        this.animalName = animalName;
        this.animalTurn = animalTurn;
        this.animalAssets = animalAssets;
        this.animalCredit = animalCredit;
        this.animalHierarchy = animalHierarchy;
        this.animalIsWork = animalIsWork;
        this.animalIsEnd = animalIsEnd;
        this.animalQuestCleared = animalQuestCleared;
    }

    public void changeAnimalAssets(Long money) {
        this.animalAssets = money;
    }

    public void increaseAnimalAssets(Long money) {
        this.animalAssets += money;
    }

    public void decreaseAnimalAssets(Long money) {
        this.animalAssets -= money;
    }

    public void changeAnimalCredit(Long credit) {
        this.animalCredit = credit;
    }

    public void changeAnimalHierarchy(Long hierarchy) {
        this.animalHierarchy = hierarchy;
    }
}
