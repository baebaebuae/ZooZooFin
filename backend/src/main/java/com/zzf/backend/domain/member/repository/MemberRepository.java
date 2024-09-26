package com.zzf.backend.domain.member.repository;

import com.zzf.backend.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByKakaoMemberId(String kakaoMemberId);
}
