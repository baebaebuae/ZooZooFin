package com.zzf.backend.domain.member.dto;

import com.zzf.backend.domain.animal.entity.Animal;
import lombok.Getter;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class MyAnimalResponse {

    private final Long animalNumber;

    private final List<AnimalInfo> animals;

    public record AnimalInfo(Long animalId,
                             Long animalTypeId,
                             String animalName,
                             Long animalAssets,
                             Instant createdDate) {
    }

    public MyAnimalResponse(List<Animal> animalList) {
        this.animalNumber = (long) animalList.size();
        this.animals = animalList.stream()
                .map(this::createAnimalInfo)
                .collect(Collectors.toList());
    }

    private AnimalInfo createAnimalInfo(Animal animal) {
        return new AnimalInfo(
                animal.getAnimalId(),
                animal.getAnimalType().getAnimalTypeId(),
                animal.getName(),
                animal.getAssets(),
                animal.getCreatedDate()
        );
    }

}
