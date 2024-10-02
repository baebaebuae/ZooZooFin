package com.zzf.backend.domain.ranking.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.portfolio.entity.Portfolio;
import com.zzf.backend.domain.portfolio.repository.PortfolioRepository;
import com.zzf.backend.domain.ranking.dto.Ranking;
import com.zzf.backend.global.exception.CustomException;
import com.zzf.backend.global.status.ErrorCode;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Transactional
@SpringBootTest
@AutoConfigureRestDocs
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class RankingServiceImplTest {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private RankingService rankingService;

    @Test
    public void 랭킹_정렬_10명_미만_성공() throws Exception{
        // given
        Animal animal = animalRepository.findById(1L).orElseThrow(() -> new CustomException(ErrorCode.ANIMAL_NOT_FOUND_EXCEPTION));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 2000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 1000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 150000L));

        // when
        rankingService.updateRanking();

        // then
        Object redisData = redisTemplate.opsForValue().get("rankingList");

        ObjectMapper objectMapper = new ObjectMapper();
        List<Ranking> rankingList = objectMapper.convertValue(redisData, new TypeReference<List<Ranking>>() {});
        assertNotNull(rankingList);

        assertEquals(3, rankingList.size());

        assertEquals(1L, rankingList.getFirst().getRank());
        assertEquals(150000L, rankingList.getFirst().getTotalAsset());

        assertEquals(2L, rankingList.get(1).getRank());
        assertEquals(2000L, rankingList.get(1).getTotalAsset());
        assertEquals("베베붸", rankingList.get(1).getCharacterName());

        assertEquals(3L, rankingList.getLast().getRank());
        assertEquals(1000L, rankingList.getLast().getTotalAsset());
    }

    @Test
    public void 랭킹_정렬_10명_이상_성공() throws Exception {
        // given
        Animal animal = animalRepository.findById(1L).orElseThrow(() -> new CustomException(ErrorCode.ANIMAL_NOT_FOUND_EXCEPTION));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 2000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 1000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 150000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 500L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", -300L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 2000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 10000000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 3024005L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 0L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 87L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", -2000L));


        // when
        rankingService.updateRanking();

        // then
        Object redisData = redisTemplate.opsForValue().get("rankingList");

        ObjectMapper objectMapper = new ObjectMapper();
        List<Ranking> rankingList = objectMapper.convertValue(redisData, new TypeReference<List<Ranking>>() {});
        assertNotNull(rankingList);

        assertEquals(10, rankingList.size());

        assertEquals(1L, rankingList.getFirst().getRank());
        assertEquals(10000000L, rankingList.getFirst().getTotalAsset());

        assertEquals(2L, rankingList.get(1).getRank());
        assertEquals(3024005L, rankingList.get(1).getTotalAsset());

        assertEquals(4L, rankingList.get(3).getRank());
        assertEquals(2000L, rankingList.get(3).getTotalAsset());
        assertEquals("베베붸", rankingList.get(3).getCharacterName());

        assertEquals(5L, rankingList.get(4).getRank());
        assertEquals(2000L, rankingList.get(4).getTotalAsset());

        assertEquals(9L, rankingList.get(8).getRank());
        assertEquals(0L, rankingList.get(8).getTotalAsset());

        assertEquals(10L, rankingList.getLast().getRank());
        assertEquals(-300L, rankingList.getLast().getTotalAsset());
    }

    @Test
    public void 랭킹_조회_성공() throws Exception {
        // given
        Animal animal = animalRepository.findById(1L).orElseThrow(() -> new CustomException(ErrorCode.ANIMAL_NOT_FOUND_EXCEPTION));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 2000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 1000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 150000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 500L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", -300L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 2000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 10000000L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 3024005L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 0L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", 87L));
        portfolioRepository.save(new Portfolio(animal, "ending"
                , 20.0, 50.0, 30.0
                , "Normal Type", -2000L));


        List<Portfolio> portfolioList = portfolioRepository.findTop10ByOrderByPortfolioScoreDesc();

        List<Ranking> rankingList = new ArrayList<>();

        Long rank = 0L;
        for (Portfolio portfolio : portfolioList){
            rankingList.add(new Ranking(++rank, portfolio.getPortfolioScore(), portfolio.getAnimal().getName(), portfolio.getAnimal().getAnimalType().getAnimalImgUrl()));
        }

        redisTemplate.delete("rankingList");
        redisTemplate.opsForValue().set("rankingList", rankingList);

        // when
        rankingList = rankingService.getRankingList();

        // then
        assertEquals(10, rankingList.size());

        assertEquals(1L, rankingList.getFirst().getRank());
        assertEquals(10000000L, rankingList.getFirst().getTotalAsset());

        assertEquals(2L, rankingList.get(1).getRank());
        assertEquals(3024005L, rankingList.get(1).getTotalAsset());

        assertEquals(4L, rankingList.get(3).getRank());
        assertEquals(2000L, rankingList.get(3).getTotalAsset());
        assertEquals("베베붸", rankingList.get(3).getCharacterName());

        assertEquals(5L, rankingList.get(4).getRank());
        assertEquals(2000L, rankingList.get(4).getTotalAsset());

        assertEquals(9L, rankingList.get(8).getRank());
        assertEquals(0L, rankingList.get(8).getTotalAsset());

        assertEquals(10L, rankingList.getLast().getRank());
        assertEquals(-300L, rankingList.getLast().getTotalAsset());
    }

    @AfterAll
    public void tearDown() {
        redisTemplate.delete("rankingList");
    }
}
