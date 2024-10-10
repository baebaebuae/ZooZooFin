package com.zzf.backend.domain.stock.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record StockHintResponse(String newsTitle,
                                Double negativeRatio,
                                Double neutralRatio,
                                Double positiveRatio,
                                List<Sentence> negativeSentences,
                                List<Sentence> positiveSentences,
                                Double predictedPrice,
                                String summary,
                                List<Long> price) {

    @Builder
    public record Sentence(Double score,
                           String sentence) {
    }
}
