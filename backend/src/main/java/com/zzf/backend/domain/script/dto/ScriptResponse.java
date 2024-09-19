package com.zzf.backend.domain.script.dto;

import com.zzf.backend.domain.script.document.Script;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class ScriptResponse {

    @Schema(example = "tutorial")
    private String category;

    private List<ScriptDto> scripts;

}
