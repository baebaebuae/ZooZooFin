package com.zzf.backend.domain.animal.entity;

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
public class AnimalType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_type_id")
    private Long animalTypeId;

    @Column(name = "animal_type_name")
    @NotNull
    private String animalTypeName;

    @Column(name = "animal_ability")
    @NotNull
    private Long animalAbility;

    @Column(name = "animal_img_url")
    @NotNull
    private String animalImgUrl;
}
