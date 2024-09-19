package com.zzf.backend.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    OK(200, "성공"),
    LOGIN_SUCCESS(200, "로그인 성공"),
    READ_SUCCESS(200, "조회 성공"),
    CREATE_SUCCESS(201, "등록 성공"),
    UPDATE_SUCCESS(200, "수정 성공"),
    DELETE_SUCCESS(200, "삭제 성공"),
    SCRIPT_SUCCESS(200, "스크립트 조회 성공")
    ;

    private final int httpStatus;
    private final String message;

}
