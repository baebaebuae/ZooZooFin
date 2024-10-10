package com.zzf.backend.domain.stock.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class AiOutputDto {

    @JsonProperty("negative_ratio")
    public Double negativeRatio;

    @JsonProperty("negative_sentences")
    public List<NegativeSentence> negativeSentences;

    @JsonProperty("neutral_ratio")
    public Double neutralRatio;

    @JsonProperty("positive_ratio")
    public Double positiveRatio;

    @JsonProperty("positive_sentences")
    public List<PositiveSentence> positiveSentences;

    @JsonProperty("predicted_price")
    public Double predictedPrice;

    @JsonProperty("summary")
    public String summary;


    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NegativeSentence {

        @JsonProperty("score")
        public Double score;

        @JsonProperty("sentence")
        public String sentence;

    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PositiveSentence {

        @JsonProperty("score")
        public Double score;

        @JsonProperty("sentence")
        public String sentence;

    }
}
