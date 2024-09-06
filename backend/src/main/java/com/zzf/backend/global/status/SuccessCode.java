package com.zzf.backend.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    OK(HttpStatus.OK, "성공"),
    OK(200, "성공"),
    ;

    private final int httpStatus;
    private final String message;

}
