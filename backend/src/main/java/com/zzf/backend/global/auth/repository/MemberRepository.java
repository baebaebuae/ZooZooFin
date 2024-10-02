package com.zzf.backend.global.auth.repository;

import com.zzf.backend.global.auth.entity.Member;
import com.zzf.backend.global.auth.security.OAuth2Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);

    Optional<Member> findByProviderNameAndProviderId(OAuth2Provider provider, String providerId);
}