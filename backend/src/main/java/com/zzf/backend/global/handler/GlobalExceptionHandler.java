package com.zzf.backend.global.handler;

import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    protected ResponseDto<?> handleException(Exception e) {
        return ResponseDto.fail(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseDto<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return ResponseDto.fail(HttpStatus.BAD_REQUEST, e.getBindingResult().getFieldError().getDefaultMessage());
    }

    @ExceptionHandler(CustomException.class)
    protected ResponseDto<?> handleCustomException(CustomException e) {
        return ResponseDto.fail(e.getErrorCode());
    }

}
