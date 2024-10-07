package com.zzf.backend.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    OK(200, "성공"),

    LOGIN_SUCCESS(200, "로그인 성공"),
    LOGOUT_SUCCESS(204, "로그아웃 성공"),
    REISSUE_SUCCESS(201, "토큰 재발급 성공"),

    PROFILE_SUCCESS(200, "프로필 조회 성공"),

    MY_ANIMAL_SUCCESS(200, "나의 동물 리스트 조회 성공"),

    // Stock
    GET_HOLDINGS_SUCCESS(200, "보유 주식 조회 성공"),
    GET_STOCK_LIST_SUCCESS(200, "주식 리스트 조회 성공"),
    STOCK_INFO_SUCCESS(200, "주식 상세 정보 조회 성공"),
    STOCK_DETAIL_SUCCESS(200, "주식 재무제표 조회 성공"),
    BUY_STOCK_SUCCESS(201, "주식 구매 성공"),
    SELL_STOCK_SUCCESS(204, "주식 판매 성공"),

    ANIMAL_TYPES_SUCCESS(200, "동물 타입 조회 성공"),
    ANIMAL_CREATE_SUCCESS(201, "동물 생성 성공"),
    PORTFOLIO_SUCCESS(200, "포트폴리오 조회 성공"),
    ANIMAL_INFO_SUCCESS(200, "동물 정보 조회 성공"),
    ANIMAL_QUEST_SUCCESS(200, "퀘스트 조회 성공"),
    ENDING_SUCCESS(201, "엔딩 성공"),

    READ_SUCCESS(200, "조회 성공"),
    CREATE_SUCCESS(201, "등록 성공"),
    UPDATE_SUCCESS(200, "수정 성공"),
    DELETE_SUCCESS(200, "삭제 성공"),
    SCRIPT_SUCCESS(200, "스크립트 조회 성공"),

    WORK_SUCCESS(201, "급여 지불 성공"),

    TODAY_QUIZ_SUCCESS(200, "오늘의 퀴즈 조회 성공"),
    QUIZ_SUCCESS(200, "퀴즈 조회 성공"),
    QUIZ_GRADING_SUCCESS(200, "퀴즈 채점 성공"),

    ;

    private final int httpStatus;
    private final String message;

}
