package com.zzf.backend.domain.stock.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record NotebookStockListResponse(Long totalAmount,
                                        List<NotebookStock> domesticList,
                                        List<NotebookStock> overseaList,
                                        List<NotebookStock> etfList) {

    @Builder
    public record NotebookStock(Long stockId,
                                String stockName,
                                Long stockTotal,
                                Double stockRate) {
    }
}
