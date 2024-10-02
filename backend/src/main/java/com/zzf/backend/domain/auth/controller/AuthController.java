package com.zzf.backend.domain.auth.controller;

import com.zzf.backend.domain.auth.dto.ReissueRequest;
import com.zzf.backend.domain.auth.dto.ReissueResponse;
import com.zzf.backend.domain.auth.service.AuthService;
import com.zzf.backend.global.auth.annotation.AccessToken;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/logout")
    public ResponseDto<Void> logout(@AccessToken String accessToken) {
        authService.logout(accessToken);

        return ResponseDto.success(LOGOUT_SUCCESS);
    }

    @PatchMapping("/reissue")
    public ResponseDto<ReissueResponse> reissueAccessToken(@AccessToken String accessToken,
                                                           @RequestBody ReissueRequest reissueRequest) {
        ReissueResponse reissue = authService.reissue(accessToken, reissueRequest.getRefreshToken());

        return ResponseDto.success(REISSUE_SUCCESS, reissue);
    }
}
