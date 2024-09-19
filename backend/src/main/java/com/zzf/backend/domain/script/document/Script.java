package com.zzf.backend.domain.script.document;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "script")
public class Script {

    @Id
    private Long scriptId;
    private String type;  // 스크립트 타입 (action, script)
    private String content;
    private String category;
    private List<Responses> responses;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Responses {

        @Schema(example = "2")
        private Long nextScript;

        @Schema(example = "null")
        private String selection;
    }
}
