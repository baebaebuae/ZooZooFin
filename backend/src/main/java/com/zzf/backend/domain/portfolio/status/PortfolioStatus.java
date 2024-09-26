package com.zzf.backend.domain.portfolio.status;

import com.zzf.backend.global.exception.CustomException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import static com.zzf.backend.global.status.ErrorCode.*;

@Getter
@AllArgsConstructor
public enum PortfolioStatus {
    STABLE("안정형"),
    PASSIVE("안정추구형"),
    NEUTRAL("위험중립형"),
    ACTIVE("적극투자형"),
    AGGRESSIVE("공격투자형"),

    ;

    private final String investStyle;

    public static PortfolioStatus getInvestStyle(Double stockPercent) {
        if (stockPercent == null || stockPercent < 0.0 || stockPercent > 100.0) {
            throw new CustomException(STOCK_PERCENT_EXCEPTION);
        }

        if (stockPercent <= 20.0) {
            return STABLE;
        } else if (stockPercent <= 40.0) {
            return PASSIVE;
        } else if (stockPercent <= 60.0) {
            return NEUTRAL;
        } else if (stockPercent <= 80.0) {
            return ACTIVE;
        } else {
            return AGGRESSIVE;
        }
    }

}
