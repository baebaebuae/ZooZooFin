package com.zzf.backend.domain.character.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CharacterType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_type_id")
    @NotNull
    private Long characterTypeId;

    @Column(name = "character_type_name")
    @NotNull
    private String characterTypeName;

    @Column(name = "character_ability")
    @NotNull
    private Long characterAbility;

    @Column(name = "character_img_url")
    @NotNull
    private String characterImgUrl;
}
