package com.zzf.backend.domain.script.controller;

import com.zzf.backend.domain.script.dto.ScriptDto;
import com.zzf.backend.domain.script.dto.ScriptResponse;
import com.zzf.backend.domain.script.service.ScriptService;
import com.zzf.backend.domain.script.document.Script;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scripts")
public class ScriptController {

    private final ScriptService scriptService;

    // 모든 스크립트 조회
    @GetMapping
    public ResponseDto<List<Script>> getAllScripts() {
        return ResponseDto.success(SuccessCode.SCRIPT_SUCCESS, scriptService.findAllScripts());
    }

    // 카테고리별 스크립트 조회
    @GetMapping("/category")
    public ResponseDto<ScriptResponse> getScriptsByCategory(@RequestParam(name = "category") String category) {
        log.info("category = {}", category);
        List<Script> scripts = scriptService.findScriptByCategory(category);
        log.info("script = {}", scripts);
        List<ScriptDto> scriptDtoList = scripts.stream()
                .map(ScriptDto::new)
                .collect(Collectors.toList());
        log.info("scriptDtoList = {}", scriptDtoList);
        ScriptResponse scriptResponse = new ScriptResponse(category, scriptDtoList);

        return ResponseDto.success(SuccessCode.SCRIPT_SUCCESS, scriptResponse);
    }

}