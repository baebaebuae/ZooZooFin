package com.zzf.backend.domain.character.entity;

import com.zzf.backend.domain.auth.entity.Member;
import com.zzf.backend.global.base.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`character`")
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Character extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id")
    private Long characterId;

    @Column(name = "character_name")
    @NotNull
    private String characterName;

    @Column(name = "character_turn")
    @NotNull
    private Long characterTurn;

    @Column(name = "character_assets")
    @NotNull
    private Long characterAssets;

    @Column(name = "character_credit")
    @NotNull
    private Long characterCredit;

    @Column(name = "character_hierarchy")
    @NotNull
    private Long characterHierarchy;

    @Column(name = "character_is_end")
    @NotNull
    private Boolean characterIsEnd;

    @Column(name = "character_quest_cleared")
    @NotNull
    private Boolean characterQuestCleared;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @NotNull
    private Member member;

    // FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_type_id")
    @NotNull
    private CharacterType characterType;

    public void changeCharacterAssets(Long money){
        this.characterAssets = money;
    }

    public void changeCharacterCredit(Long credit){
        this.characterCredit = credit;
    }

    public void changeCharacterHierarchy(Long hierarchy){
        this.characterHierarchy = hierarchy;
    }
}
