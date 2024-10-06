package com.zzf.backend.domain.ranking.controller;

import com.zzf.backend.domain.ranking.dto.Ranking;
import com.zzf.backend.domain.ranking.service.RankingService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/ranking")
public class RankingController {

    private final RankingService rankingService;

    @GetMapping
    public ResponseDto<List<Ranking>> getRanking() {

        return ResponseDto.success(SuccessCode.READ_SUCCESS, rankingService.getRankingList());
    }
}
