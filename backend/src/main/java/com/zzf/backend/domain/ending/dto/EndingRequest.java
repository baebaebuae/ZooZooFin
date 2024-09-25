package com.zzf.backend.domain.ending.dto;

import lombok.Builder;

@Builder
public record EndingRequest(String endingType) {
}
