package com.zzf.backend.domain.member.dto;

import lombok.Builder;

@Builder
public record StartInfoResponse(Boolean isStarted,
                                Boolean isActivated) {
}
