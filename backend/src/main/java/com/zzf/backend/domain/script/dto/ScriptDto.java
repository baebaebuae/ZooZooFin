package com.zzf.backend.domain.script.dto;

import com.zzf.backend.domain.script.document.Script;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
public class ScriptDto {

    @Schema(example = "1")
    private final Long scriptId;

    @Schema(example = "script")
    private final String type;

    @Schema(example = "안녕? 주주시티에 온 걸 환영해.")
    private final String content;

    private final List<Script.Responses> responses;

    public ScriptDto(Script script) {
        this.scriptId = script.getScriptId();
        this.type = script.getType();
        this.content = script.getContent();
        this.responses = script.getResponses();
    }

}