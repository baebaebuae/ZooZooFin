package com.zzf.backend.domain.script.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class ScriptResponse {

    private String category;

    private List<ScriptDto> scripts;

}
