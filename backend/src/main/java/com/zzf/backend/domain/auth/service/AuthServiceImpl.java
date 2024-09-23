package com.zzf.backend.domain.auth.service;

import com.zzf.backend.domain.auth.dto.ReissueResponse;
import com.zzf.backend.global.exception.CustomException;
import com.zzf.backend.global.jwt.JwtProvider;
import com.zzf.backend.global.redis.entity.LogoutToken;
import com.zzf.backend.global.redis.entity.RefreshToken;
import com.zzf.backend.global.redis.repository.LogoutRepository;
import com.zzf.backend.global.redis.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.zzf.backend.global.status.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtProvider jwtProvider;

    @Value("${jwt.access-expiration}")
    private Long accessExpiration;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;

    private final LogoutRepository logoutRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void logout(String accessToken) {
        LogoutToken logoutToken = LogoutToken.builder()
                .accessToken(accessToken)
                .expiresIn(accessExpiration)
                .build();

        logoutRepository.save(logoutToken);
        refreshTokenRepository.deleteByAccessToken(accessToken);
    }

    @Override
    public ReissueResponse reissue(String oldAccessToken, String oldRefreshToken) {
        RefreshToken token = refreshTokenRepository.findById(oldRefreshToken)
                .orElseThrow(() -> new CustomException(EXPIRED_TOKEN));

        if (!token.getAccessToken().equals(oldAccessToken)) {
            throw new CustomException(EXPIRED_TOKEN);
        }

        String memberId = token.getMemberId().toString();
        String newAccessToken = jwtProvider.createAccessToken(memberId);
        String newRefreshToken = jwtProvider.createRefreshToken();

        refreshTokenRepository.deleteById(oldRefreshToken);

        refreshTokenRepository.save(RefreshToken.builder()
                .memberId(memberId)
                .refreshToken(newRefreshToken)
                .accessToken(newAccessToken)
                .expiresIn(refreshExpiration)
                .build());

        return ReissueResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }
}
