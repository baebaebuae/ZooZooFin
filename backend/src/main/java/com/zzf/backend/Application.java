package com.zzf.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.redis.core.RedisKeyValueAdapter;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = {"com.zzf.backend.domain", "com.zzf.backend.global.auth"})
@EnableMongoRepositories(basePackages = "com.zzf.backend.domain.script")
@EnableRedisRepositories(basePackages = "com.zzf.backend.global.redis",
        enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
