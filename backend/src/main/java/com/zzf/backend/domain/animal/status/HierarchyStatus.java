package com.zzf.backend.domain.animal.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum HierarchyStatus {
    KING(10_000_000_000L, Long.MAX_VALUE, "당근 투자왕"),
    BOSS(1_000_000_000L, 10_000_000_000L, "당근 사장"),
    SENIOR(100_000_000L, 1_000_000_000L, "당근 전무"),
    DIRECTOR(10_000_000L, 100_000_000L, "당근 부장"),
    MANAGER(5_000_000L, 10_000_000L, "당근 매니저"),
    PART_TIME(100_000L, 5_000_000L, "당근 알바생"),
    POOR(Long.MIN_VALUE, 100_000L, "가난한 당근"),

    ;

    private final Long hierarchyStart;
    private final Long hierarchyEnd;
    private final String hierarchyName;

    public static HierarchyStatus getHierarchy(Long totalAssets) {
        return Arrays.stream(values()).filter(h ->
                        h.getHierarchyStart() <= totalAssets && h.getHierarchyEnd() > totalAssets)
                .findFirst().orElseThrow();
    }

}