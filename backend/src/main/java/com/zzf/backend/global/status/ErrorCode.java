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

    USER_NOT_FOUND_EXCEPTION(404, "존재하지 않는 사용자입니다."),
    ANIMAL_NOT_FOUND_EXCEPTION(404, "존재하지 않는 캐릭터입니다."),
    DEPOSIT_NOT_FOUND_EXCEPTION(404, "존재하지 않는 예금입니다."),
    SAVINGS_NOT_FOUND_EXCEPTION(404, "존재하지 않는 적금입니다."),
    LOAN_NOT_FOUND_EXCEPTION(404, "존재하지 않는 대출입니다."),
    CAPITAL_NOT_FOUND_EXCEPTION(404, "존재하지 않는 사채입니다."),
    DEPOSIT_TYPE_NOT_FOUND_EXCEPTION(404, "존재하지 않는 예금상품입니다."),
    SAVINGS_TYPE_NOT_FOUND_EXCEPTION(404, "존재하지 않는 적금상품입니다."),
    QUIZ_NOT_FOUND_EXCEPTION(404, "존재하지 않는 퀴즈지롱~!"),
    QUIZ_RESULT_NOT_FOUND_EXCEPTION(404, "존재하지 않는 퀴즈 결과지롱~!"),

    CASH_SHORTAGE_EXCEPTION(409, "현금이 부족합니다."),

    SAME_DAY_CANCELLATION_NOT_ALLOWED(400, "당일 취소는 불가능합니다."),
    CREDIT_LOW(400, "신용 등급이 낮습니다."),
    NO_SUCH_LOAN_TYPE_EXCEPTION(404, "존재하지 않는 대출 타입입니다."),
    NO_SUCH_CREDIT_EXCEPTION(404, "존재하지 않는 대출 등급입니다."),

    DUPLICATE_QUIZ_ID_EXCEPTION(400, "중복된 퀴즈 아이디가 존재합니다.")

    ;
    private final int httpStatus;
    private final String message;


}
