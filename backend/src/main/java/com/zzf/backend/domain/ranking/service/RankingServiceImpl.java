package com.zzf.backend.domain.ranking.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zzf.backend.domain.portfolio.entity.Portfolio;
import com.zzf.backend.domain.portfolio.repository.PortfolioRepository;
import com.zzf.backend.domain.ranking.dto.Ranking;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService{

    private final RedisTemplate<String, Object> redisTemplate;
    private final PortfolioRepository portfolioRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional(readOnly = true)
    public void init() {
        cacheRanking();
    }

    @Override
    @Scheduled(cron = "0 0/5 * * * ?")
    @Transactional(readOnly = true)
    public void updateRanking(){
        cacheRanking();
    }

    @Transactional(readOnly = true)
    protected void cacheRanking(){
        List<Portfolio> portfolioList = portfolioRepository.findTop10ByOrderByPortfolioScoreDesc();

        List<Ranking> rankingList = new ArrayList<>();
        Long rank = 0L;

        for (Portfolio portfolio : portfolioList){
            rankingList.add(new Ranking(++rank, portfolio.getPortfolioScore(), portfolio.getAnimal().getName(), portfolio.getAnimal().getAnimalType().getAnimalImgUrl()));
        }

        // Redis List로 저장
        redisTemplate.delete("rankingList");
        redisTemplate.opsForValue().set("rankingList", rankingList);
    }

    @Override
    public List<Ranking> getRankingList() {
        Object redisData = redisTemplate.opsForValue().get("rankingList");

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(redisData, new TypeReference<List<Ranking>>() {});
    }

}
