package com.zzf.backend.domain.ranking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Ranking {
    private Long rank;
    private Long totalAsset;
    private String characterName;
    private String characterImg;
}
