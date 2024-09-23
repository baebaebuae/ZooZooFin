package com.zzf.backend.domain.animal.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AnimalCreateRequest {

    private final Long animalTypeId;

    private final String animalName;

}
