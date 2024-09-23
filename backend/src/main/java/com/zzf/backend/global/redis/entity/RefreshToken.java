package com.zzf.backend.global.redis.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash(value = "refreshToken")
@Getter
@Builder
public class RefreshToken {

    @Id
    private final String refreshToken;

    private final String accessToken;

    private final String memberId;

    @TimeToLive
    private final Long expiresIn;

}
