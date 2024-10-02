package com.zzf.backend.domain.ranking.service;

import com.zzf.backend.domain.ranking.dto.Ranking;
import com.zzf.backend.domain.ranking.dto.RankingResponse;

import java.util.List;

public interface RankingService {
    void updateRanking();

    List<Ranking> getRankingList();
}
