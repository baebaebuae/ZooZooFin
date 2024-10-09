package com.zzf.backend.domain.member.dto;

import lombok.Builder;

@Builder
public record ProfileResponse(String animalImg,
                              Long animalAssets,
                              Long memberGoldBar,
                              Long turn) {

}
