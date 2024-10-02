package com.zzf.backend.domain.ranking.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RankingResponse {
    private List<Ranking> rankingList;
    private LocalDateTime updatedTime;
}
