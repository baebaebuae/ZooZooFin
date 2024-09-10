package com.zzf.backend.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BAD_REQUEST(400, "실패"),
    WRONG_PROVIDER(404, "지원하지 않는 소셜 로그인입니다."),
    KAKAO_PARAMETER_ERROR(400, "유효하지 않은 카카오 로그인 요청입니다."),
    KAKAO_SERVER_ERROR(500, "카카오 서버 오류입니다."),
    ;

    private final int httpStatus;
    private final String message;


}
