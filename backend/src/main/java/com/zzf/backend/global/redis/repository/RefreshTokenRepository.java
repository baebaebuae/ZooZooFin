package com.zzf.backend.global.redis.repository;

import com.zzf.backend.global.redis.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    void deleteByAccessToken(String accessToken);
}
