package com.zzf.backend.global.dto;

import com.zzf.backend.global.status.ErrorCode;
import com.zzf.backend.global.status.SuccessCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ResponseDto<T> {

    private HttpStatus status;
    private String message;
    private T body;

    public static <T> ResponseDto<T> success(SuccessCode code, T body) {
        return new ResponseDto<>(code.getStatus(), code.getMessage(), body);
    }

    public static <T> ResponseDto<T> fail(ErrorCode code) {
        return new ResponseDto<>(code.getStatus(), code.getMessage(), null);
    }

    public static <T> ResponseDto<T> fail(HttpStatus code, String message) {
        return new ResponseDto<>(code, message, null);
    }

}
