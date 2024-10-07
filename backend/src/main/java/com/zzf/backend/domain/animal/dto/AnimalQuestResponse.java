package com.zzf.backend.domain.animal.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record AnimalQuestResponse(List<Quest> questList) {

    @Builder
    public record Quest(String name,
                        Boolean completed,
                        String page) {
    }
}
