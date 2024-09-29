package com.zzf.backend.domain.stock.service;

import com.zzf.backend.domain.stock.dto.*;

public interface StockService {
    GetHoldingsResponse getHoldings(Long animalId, String stockType);

    StockListResponse getStockList(Long animalId, String stockType);

    StockInfoResponse getStockInfo(Long animalId, Long stockId);

    StockDetailResponse getStockDetail(Long animalId, Long stockId);

    void buyStock(Long animalId, BuyStockRequest buyStockRequest);

    void sellStock(Long animalId, SellStockRequest sellStockRequest);

}
