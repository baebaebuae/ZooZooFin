package com.zzf.backend.domain.stock.dto;

import lombok.Builder;

import java.util.Date;

@Builder
public record AiInputDto(String industryField,
                         String stockField,
                         String stockCode,
                         Date inputDate,
                         String newsData) {
}
