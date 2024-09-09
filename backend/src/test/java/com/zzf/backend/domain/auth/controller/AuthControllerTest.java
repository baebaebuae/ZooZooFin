package com.zzf.backend.domain.auth.controller;

import com.google.gson.Gson;
import com.zzf.backend.global.status.SuccessCode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import static com.zzf.backend.global.status.SuccessCode.LOGIN_SUCCESS;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ActiveProfiles("local")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    // TODO: JWT 토큰 픽스
    private final String jwtToken = "ASDF";

    @Value("${oauth.google.secret}")
    private String googleClientId;
    @Value("${oauth.naver.secret}")
    private String naverClientId;
    @Value("${oauth.kakao.secret}")
    private String kakaoClientId;

    @Value("${base-url}")
    private String baseUrl;

    @Test
    void kakaoRedirectSuccess() throws Exception {
        // given
        String provider = "kakao";

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/auth/" + provider)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("https://kauth.kakao.com/oauth/authorize" +
                        "?client_id=" + kakaoClientId +
                        "&redirect_uri=" + baseUrl + "/api/v1/auth/callback/kakao" +
                        "&response_type=code"));

    }

    @Test
    void naverRedirectSuccess() throws Exception {
        // given
        String provider = "naver";

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/auth/" + provider)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("https://nid.naver.com/oauth2.0/authorize" +
                        "?client_id=" + naverClientId +
                        "&redirect_uri=" + baseUrl + "/api/v1/auth/callback/naver" +
                        "&response_type=code"));

    }

    @Test
    void googleRedirectSuccess() throws Exception {
        // given
        String provider = "google";

        // when
        ResultActions actions = mockMvc.perform(
                get("/api/v1/auth/" + provider)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("https://accounts.google.com/o/oauth2/auth" +
                        "client_id=" + googleClientId +
                        "&redirect_uri=" + baseUrl + "/api/v1/auth/callback/google" +
                        "&response_type=code"));

    }


    @Test
    void kakaoLoginSuccess() throws Exception {
        // given
        String provider = "kakao";

        // when
        ResultActions actions = mockMvc.perform(get("/api/v1/auth/callback/" + provider)
                .param("code", "test")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.httpStatus").value(LOGIN_SUCCESS.getHttpStatus()))
                .andExpect(jsonPath("$.message").value(LOGIN_SUCCESS.getMessage()))
                // TODO: JWT 토큰 하나 픽스하고 해당하는 userId 작성
                .andExpect(jsonPath("$.body.userId").value("kakaoTestUser"));
    }
}
