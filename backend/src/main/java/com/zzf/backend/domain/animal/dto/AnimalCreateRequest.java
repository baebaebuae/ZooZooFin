package com.zzf.backend.domain.animal.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalCreateRequest {

    private Long animalTypeId;

    private String animalName;

}
