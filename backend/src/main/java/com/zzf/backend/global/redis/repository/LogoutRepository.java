package com.zzf.backend.global.redis.repository;

import com.zzf.backend.global.redis.entity.LogoutToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LogoutRepository extends CrudRepository<LogoutToken, String> {
}
