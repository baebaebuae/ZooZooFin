package com.zzf.backend.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Global
    BAD_REQUEST(400, "실패"),
    METHOD_NOT_ALLOWED(405, "유효하지 않은 요청입니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러"),

    // JWT
    JWT_ERROR(401, "토큰 에러가 발생했습니다."),
    EXPIRED_TOKEN(401, "만료된 토큰입니다."),
    MALFORMED_TOKEN(401, "유효하지 않은 토큰입니다."),
    UNSUPPORTED_TOKEN(401, "허용되지 않은 토큰입니다."),

    // Auth
    AUTHORIZATION_HEADER_NOT_EXIST(401, "인증 헤더가 존재하지 않습니다."),
    UNAUTHORIZED(401, "인증되지 않은 요청입니다."),
    ACCESS_DENIED(403, "허용되지 않는 접근입니다."),
    AUTHENTICATION_REQUIRED(401, "올바르지 않은 권한입니다."),
    ALREADY_LOGOUT(401, "이미 로그아웃한 토큰입니다."),

    // OAuth
    WRONG_PROVIDER(404, "지원하지 않는 소셜 로그인입니다."),
    KAKAO_PARAMETER_ERROR(400, "유효하지 않은 카카오 로그인 요청입니다."),
    KAKAO_SERVER_ERROR(500, "카카오 서버 오류입니다."),

    // Member
    MEMBER_NOT_FOUND_EXCEPTION(404, "존재하지 않는 사용자입니다."),

    // Animal
    ANIMAL_NOT_FOUND_EXCEPTION(404, "존재하지 않는 동물입니다."),
    ANIMAL_ALREADY_EXIST(400, "이미 진행중인 동물이 있습니다."),
    ANIMAL_UNAVAILABLE_EXCEPTION(404, "접근할 수 없는 동물입니다."),
    ANIMAL_ALL_END_EXCEPTION(404, "게임을 진행중인 동물이 없습니다."),
    ANIMAL_TYPE_NOT_FOUND_EXCEPTION(404, "존재하지 않는 동물 타입입니다."),

    // Deposit
    DEPOSIT_NOT_FOUND_EXCEPTION(404, "존재하지 않는 예금입니다."),
    DEPOSIT_TYPE_NOT_FOUND_EXCEPTION(404, "존재하지 않는 예금상품입니다."),

    // Savings
    SAVINGS_NOT_FOUND_EXCEPTION(404, "존재하지 않는 적금입니다."),
    SAVINGS_TYPE_NOT_FOUND_EXCEPTION(404, "존재하지 않는 적금상품입니다."),

    // Loan
    LOAN_NOT_FOUND_EXCEPTION(404, "존재하지 않는 대출입니다."),
    NO_SUCH_LOAN_TYPE_EXCEPTION(404, "존재하지 않는 대출 타입입니다."),

    // Capital
    CAPITAL_NOT_FOUND_EXCEPTION(404, "존재하지 않는 사채입니다."),
    CAPITAL_DUPLICATE_NOT_ALLOWED_EXCEPTION(400, "사채는 중복 대출이 불가능합니다."),

    // Turn
    TURN_RECORD_NOT_FOUND(404, "턴 기록을 찾을 수 없습니다."),
    TURN_OVER_EXCEPTION(400, "51턴 이상은 진행이 불가능합니다."),

    // NextTurn
    NEXT_TURN_RECORD_NOT_FOUND(404, "다음 턴 기록을 찾을 수 없습니다."),

    // Warning
    WARNING_RECORD_NOT_FOUND(404, "경고 기록을 찾을 수 없습니다."),

    // Stock
    STOCK_NOT_FOUND_EXCEPTION(404, "존재하지 않는 주식입니다."),
    CHART_NOT_FOUND_EXCEPTION(404, "존재하지 않는 주식 차트입니다."),
    STOCK_TYPE_NOT_FOUND_EXCEPTION(404, "존재하지 않는 주식 타입입니다."),
    LACK_ASSETS_EXCEPTION(400, "주식을 구매할 자금이 부족합니다."),
    HOLDINGS_NOT_FOUND_EXCEPTION(400, "해당 주식을 보유하고 있지 않습니다."),
    LACK_STOCK_EXCEPTION(400, "보유중인 주식이 부족합니다."),
    FINANCIAL_STATEMENTS_NOT_FOUND(404, "재무제표를 찾을 수 없습니다."),

    // Quiz
    QUIZ_NOT_FOUND_EXCEPTION(404, "존재하지 않는 퀴즈지롱~!"),
    QUIZ_RESULT_NOT_FOUND_EXCEPTION(404, "존재하지 않는 퀴즈 결과지롱~!"),
    DUPLICATE_QUIZ_ID_EXCEPTION(400, "중복된 퀴즈 아이디가 존재합니다."),

    CASH_SHORTAGE_EXCEPTION(409, "현금이 부족합니다."),
    SAME_DAY_CANCELLATION_NOT_ALLOWED(400, "당일 취소는 불가능합니다."),
    CREDIT_LOW(400, "신용 등급이 낮습니다."),
    NO_SUCH_CREDIT_EXCEPTION(404, "존재하지 않는 대출 등급입니다."),
    EARLY_REPAYMENT_NOT_ALLOWED_EXCEPTION(400, "중도 상환은 불가능합니다."),

    // Work
    ALREADY_WORK_TODAY_EXCEPTION(400, "이미 당일 업무를 마쳤습니다."),

    // Ending
    ENDING_STATUS_NOT_FOUND_EXCEPTION(404, "해당 코드의 엔딩을 찾을 수 없습니다."),

    // Portfolio
    PORTFOLIO_NOT_FOUND_EXCEPTION(404, "포트폴리오를 찾을 수 없습니다."),
    PORTFOLIO_ALREADY_EXIST_EXCEPTION(400, "이미 포트폴리오가 존재합니다."),
    STOCK_PERCENT_EXCEPTION(400, "주식 비율이 비정상적입니다."),

    ;
    private final int httpStatus;
    private final String message;


}
