package com.zzf.backend.global.jwt;

import com.zzf.backend.domain.animal.entity.Animal;
import com.zzf.backend.domain.animal.repository.AnimalRepository;
import com.zzf.backend.domain.member.entity.Member;
import com.zzf.backend.domain.member.repository.MemberRepository;
import com.zzf.backend.global.exception.CustomException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.UUID;

import static com.zzf.backend.global.status.ErrorCode.*;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Component
public class JwtProvider {

    public static final String BEARER_PREFIX = "bearer ";

    private final Duration accessExpiration;
    private final Key key;
    private final MemberRepository memberRepository;
    private final AnimalRepository animalRepository;

    public JwtProvider(@Value("${jwt.secret-key}") String secretKey,
                       @Value("${jwt.access-expiration}") Long accessExpiration,
                       AnimalRepository animalRepository,
                       MemberRepository memberRepository) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.accessExpiration = Duration.ofSeconds(accessExpiration);
        this.memberRepository = memberRepository;
        this.animalRepository = animalRepository;
    }

    public String getAccessTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader(AUTHORIZATION);

        return getAccessTokenFromHeader(header);
    }

    public String getAccessTokenFromHeader(String header) {
        if (header != null) {
            if (!header.toLowerCase().startsWith(BEARER_PREFIX)) {
                throw new CustomException(MALFORMED_TOKEN);
            }
            return header.substring(7);
        }

        throw new CustomException(AUTHORIZATION_HEADER_NOT_EXIST);
    }

    public String getMemberIdFromAccessToken(String accessToken) {
        return (String) Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody()
                .get("memberId");
    }

    public Long getAnimalIdFromAccessToken(String accessToken) {
        String memberId = getMemberIdFromAccessToken(accessToken);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND_EXCEPTION));
        Animal animal = animalRepository.findByMemberAndAnimalIsEndFalse(member)
                .orElseThrow(() -> new CustomException(ANIMAL_NOT_FOUND_EXCEPTION));

        return animal.getAnimalId();
    }

    public String createAccessToken(String memberId) {
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime expirationTime = now.plus(accessExpiration);

        return Jwts.builder()
                .claim("memberId", memberId)
                .setExpiration(Date.from(expirationTime.toInstant()))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken() {
        return UUID.randomUUID().toString();
    }

    public void validateAccessToken(String accessToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken);
        } catch (ExpiredJwtException e) {
            throw new CustomException(EXPIRED_TOKEN);
        } catch (MalformedJwtException e) {
            throw new CustomException(MALFORMED_TOKEN);
        } catch (UnsupportedJwtException e) {
            throw new CustomException(UNSUPPORTED_TOKEN);
        } catch (JwtException e) {
            throw new CustomException(JWT_ERROR);
        }
    }
}