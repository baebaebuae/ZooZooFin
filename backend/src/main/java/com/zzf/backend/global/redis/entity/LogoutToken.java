package com.zzf.backend.global.redis.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash(value = "logout")
@Getter
@Setter
@RequiredArgsConstructor
public class LogoutToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Indexed
    private final String accessToken;

    @TimeToLive
    @Value("${redis.ttl.access}")
    private Long expiresIn;

}
