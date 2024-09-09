package com.zzf.backend.global.redis.service;

import com.zzf.backend.global.redis.entity.LogoutToken;
import com.zzf.backend.global.redis.repository.RedisLogoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisLogoutRepository redisLogoutRepository;

    public void saveLogoutToken(String accessToken) {
        redisLogoutRepository.save(new LogoutToken(accessToken));
    }

}
