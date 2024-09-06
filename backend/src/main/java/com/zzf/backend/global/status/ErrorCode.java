package com.zzf.backend.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    BAD_REQUEST(HttpStatus.BAD_REQUEST, "실패"),
    BAD_REQUEST(400, "실패"),
    ;

    private final int httpStatus;
    private final String message;


}
