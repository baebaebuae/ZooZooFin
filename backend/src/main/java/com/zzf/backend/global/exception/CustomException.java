package com.zzf.backend.global.exception;


import com.zzf.backend.global.status.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException {
    ErrorCode errorCode;
}
