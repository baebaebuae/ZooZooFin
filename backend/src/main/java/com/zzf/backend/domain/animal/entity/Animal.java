package com.zzf.backend.domain.animal.entity;

import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "animal")
@Getter
@Setter
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
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "turn")
    private Long turn;

    @NotNull
    @Column(name = "assets")
    private Long assets;

    @NotNull
    @Column(name = "credit")
    private Long credit;

    @NotNull
    @Column(name = "hierarchy")
    private String hierarchy;

    @NotNull
    @Column(name = "is_worked")
    private Boolean isWorked;

    @NotNull
    @Column(name = "is_end")
    private Boolean isEnd;

    @NotNull
    @Column(name = "quest_cleared")
    private Boolean questCleared;

    @Builder
    public Animal(Member member, AnimalType animalType, String name, Long turn, Long assets, Long credit, String hierarchy, Boolean isWorked, Boolean isEnd, Boolean questCleared) {
        this.member = member;
        this.animalType = animalType;
        this.name = name;
        this.turn = turn;
        this.assets = assets;
        this.credit = credit;
        this.hierarchy = hierarchy;
        this.isWorked = isWorked;
        this.isEnd = isEnd;
        this.questCleared = questCleared;
    }

    public void changeAnimalAssets(Long money) {
        this.assets = money;
    }

    public void increaseAnimalAssets(Long money) {
        this.assets += money;
    }

    public void decreaseAnimalAssets(Long money) {
        this.assets -= money;
    }

    public void changeAnimalCredit(Long credit) {
        this.credit = credit;
    }

    public void changeAnimalHierarchy(String hierarchy) {
        this.hierarchy = hierarchy;
    }

    /**
     * <h4>1턴 증가</h4>
     */
    public void increaseAnimalTurn(){
        this.turn++;
    }
}
