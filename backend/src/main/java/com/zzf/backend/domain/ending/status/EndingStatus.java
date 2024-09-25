package com.zzf.backend.domain.ending.status;

import com.zzf.backend.global.exception.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

import static com.zzf.backend.global.status.ErrorCode.*;

@Getter
@AllArgsConstructor
public enum EndingStatus {

    BASIC_ENDING("A001", "기본 엔딩"),
    BANKRUPT_ENDING("A002", "파산 엔딩"),
    HIDDEN_ENDING("A003", "히든 엔딩"),

    ;

    private final String endingCode;
    private final String endingName;

    public static EndingStatus getEndingStatus(String endingCode) {
        return Arrays.stream(values()).filter(e ->
                        e.endingCode.equals(endingCode)).findFirst()
                .orElseThrow(() -> new CustomException(ENDING_STATUS_NOT_FOUND_EXCEPTION));
    }
}
