package com.zzf.backend.global.auth.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zzf.backend.global.auth.entity.Member;
import com.zzf.backend.global.auth.service.MemberService;
import com.zzf.backend.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

import static com.zzf.backend.global.status.ErrorCode.BAD_REQUEST;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final ObjectMapper objectMapper;
    private final DefaultOAuth2UserService service = new DefaultOAuth2UserService();
    private final MemberService memberService;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = service.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        CustomOAuth2User oAuthMember = toOAuth2User(
                userRequest.getClientRegistration().getClientName(), attributes);

        Optional<Member> member = memberService.getIdByUsername(oAuthMember.getUsername());
        if (member.isEmpty()) {
            memberService.join(oAuthMember);
        }

        return oAuthMember;
    }

    private CustomOAuth2User toOAuth2User(String clientName, Map<String, Object> attributes) {
        switch (clientName) {
            case "kakao" -> {
                KakaoUserInfo userInfo = objectMapper.convertValue(attributes, KakaoUserInfo.class);
                String username = memberService.getUsernameOrUUID(OAuth2Provider.kakao, userInfo.id());
                return new CustomOAuth2User(userInfo, username, attributes);
            }
            case "naver" -> {
                attributes = (Map<String, Object>) attributes.get("response");
                NaverUserInfo userInfo = objectMapper.convertValue(attributes, NaverUserInfo.class);
                String username = memberService.getUsernameOrUUID(OAuth2Provider.naver, userInfo.id());
                return new CustomOAuth2User(userInfo, username, attributes);
            }
            case "google" -> {
                GoogleUserInfo userInfo = objectMapper.convertValue(attributes, GoogleUserInfo.class);
                String username = memberService.getUsernameOrUUID(OAuth2Provider.google, userInfo.sub());
                return new CustomOAuth2User(userInfo, username, attributes);
            }
            default -> throw new CustomException(BAD_REQUEST);
        }
    }
}
