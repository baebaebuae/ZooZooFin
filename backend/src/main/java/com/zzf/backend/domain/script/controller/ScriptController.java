package com.zzf.backend.domain.script.controller;

import com.zzf.backend.domain.script.dto.ScriptDto;
import com.zzf.backend.domain.script.dto.ScriptResponse;
import com.zzf.backend.domain.script.service.ScriptService;
import com.zzf.backend.domain.script.document.Script;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Tag(name = "Script", description = "Script API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/scripts")
public class ScriptController {

    private final ScriptService scriptService;

    // 모든 스크립트 조회
//    @GetMapping
//    public ResponseDto<List<Script>> getAllScripts() {
//        return ResponseDto.success(SuccessCode.SCRIPT_SUCCESS, scriptService.findAllScripts());
//    }

    // 카테고리별 스크립트 조회
    @GetMapping("/category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "스크립트 조회 성공"),
        }
    )
    public ResponseDto<ScriptResponse> getScriptsByCategory(
            @Parameter(name = "category", description = "스크립트 장소명", example = "tutorial", required = true)
            @RequestParam(name = "category") String category) {
        List<Script> scripts = scriptService.findScriptByCategory(category);
        List<ScriptDto> scriptDtoList = scripts.stream()
                .map(ScriptDto::new)
                .collect(Collectors.toList());
        ScriptResponse scriptResponse = new ScriptResponse(category, scriptDtoList);

        return ResponseDto.success(SuccessCode.SCRIPT_SUCCESS, scriptResponse);
    }

}