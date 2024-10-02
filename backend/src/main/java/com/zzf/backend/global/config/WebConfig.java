package com.zzf.backend.global.config;

import com.zzf.backend.global.auth.resolver.AccessTokenArgumentResolver;
import com.zzf.backend.global.auth.resolver.AnimalIdArgumentResolver;
import com.zzf.backend.global.auth.resolver.MemberIdArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AccessTokenArgumentResolver accessTokenArgumentResolver;
    private final MemberIdArgumentResolver memberIdArgumentResolver;
    private final AnimalIdArgumentResolver animalIdArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(accessTokenArgumentResolver);
        resolvers.add(memberIdArgumentResolver);
        resolvers.add(animalIdArgumentResolver);
    }
}
