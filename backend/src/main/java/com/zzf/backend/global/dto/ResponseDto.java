package com.zzf.backend.global.dto;

import com.zzf.backend.global.status.ErrorCode;
import com.zzf.backend.global.status.SuccessCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ResponseDto<T> {

    private int httpStatus;
    private String message;
    private T body;

    public static <T> ResponseDto<T> success(SuccessCode code, T body) {
        return new ResponseDto<>(code.getHttpStatus(), code.getMessage(), body);
    }

    public static ResponseDto<Void> success(SuccessCode code) {
        return new ResponseDto<>(code.getHttpStatus(), code.getMessage(), null);
    }

    public static <T> ResponseDto<T> fail(ErrorCode code) {
        return new ResponseDto<>(code.getHttpStatus(), code.getMessage(), null);
    }

    public static <T> ResponseDto<T> fail(HttpStatus code, String message) {
        return new ResponseDto<>(code.value(), message, null);
    }

}
