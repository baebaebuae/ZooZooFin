package com.zzf.backend.domain.script.dto;

import com.zzf.backend.domain.script.document.Script;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Getter
public class ScriptDto {

    private final Long scriptId;

    private final String type;

    private final String content;

    private final List<Script.Responses> responses;

    public ScriptDto(Script script) {
        this.scriptId = script.getScriptId();
        this.type = script.getType();
        this.content = script.getContent();
        this.responses = script.getResponses();
    }

}