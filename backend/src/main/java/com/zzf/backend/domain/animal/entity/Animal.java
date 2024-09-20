package com.zzf.backend.domain.animal.entity;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "animal")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Animal extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_id")
    private Long animalId;

    @Column(name = "animal_name")
    @NotNull
    private String animalName;

    @Column(name = "animal_turn")
    @NotNull
    private Long animalTurn;

    @Column(name = "animal_assets")
    @NotNull
    private Long animalAssets;

    @Column(name = "animal_credit")
    @NotNull
    private Long animalCredit;

    @Column(name = "animal_hierarchy")
    @NotNull
    private Long animalHierarchy;

    @Column(name = "animal_is_end")
    @NotNull
    private Boolean animalIsEnd;

    @Column(name = "animal_quest_cleared")
    @NotNull
    private Boolean animalQuestCleared;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_type_id")
    @NotNull
    private AnimalType animalType;

    public void changeAnimalAssets(Long money){
        this.animalAssets = money;
    }

    public void increaseAnimalAssets(Long money){
        this.animalAssets += money;
    }

    public void decreaseAnimalAssets(Long money){
        this.animalAssets -= money;
    }

    public void changeAnimalCredit(Long credit){
        this.animalCredit = credit;
    }

    public void changeAnimalHierarchy(Long hierarchy){
        this.animalHierarchy = hierarchy;
    }
}
