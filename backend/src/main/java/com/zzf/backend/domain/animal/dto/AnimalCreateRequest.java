package com.zzf.backend.domain.animal.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class AnimalCreateRequest {

    private final Long animalTypeId;

    private final String animalName;

}
