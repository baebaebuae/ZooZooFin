package com.zzf.backend.domain.script.dto;

import com.zzf.backend.domain.script.document.Script;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class ScriptResponse {
    private String category;
    private List<ScriptDto> scripts;

}
