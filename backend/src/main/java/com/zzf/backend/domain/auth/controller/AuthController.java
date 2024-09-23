package com.zzf.backend.domain.auth.controller;

import com.zzf.backend.domain.auth.dto.ReissueRequest;
import com.zzf.backend.domain.auth.dto.ReissueResponse;
import com.zzf.backend.domain.auth.service.AuthService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @PostMapping("/logout")
    public ResponseDto<?> logout(@RequestHeader String accessToken) {
        authService.logout(accessToken);

        return ResponseDto.success(LOGOUT_SUCCESS, null);
    }

    @PatchMapping("/reissue")
    public ResponseDto<?> reissueAccessToken(HttpServletRequest request,
                                             @RequestBody ReissueRequest reissueRequest) {
        String accessToken = jwtProvider.getAccessTokenFromRequest(request);
        ReissueResponse reissue = authService.reissue(accessToken, reissueRequest.getRefreshToken());

        return ResponseDto.success(REISSUE_SUCCESS, reissue);
    }
}
