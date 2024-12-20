package com.zzf.backend.global.redis.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash(value = "logout")
@Getter
@Builder
public class LogoutToken {

    @Id
    private final String accessToken;

    @TimeToLive
    private final Long expiresIn;

}
