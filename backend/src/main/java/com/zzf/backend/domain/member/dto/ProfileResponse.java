package com.zzf.backend.domain.member.dto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ProfileResponse {

    private final String animalImg;
    private final Long animalAssets;
    private final Long memberGoldBar;
}
