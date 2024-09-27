package com.zzf.backend.domain.stock.service;

import com.zzf.backend.domain.stock.dto.BuyStockRequest;
import com.zzf.backend.domain.stock.dto.GetHoldingsResponse;
import com.zzf.backend.domain.stock.dto.SellStockRequest;
import com.zzf.backend.domain.stock.dto.StockListResponse;

public interface StockService {
    GetHoldingsResponse getHoldings(Long animalId, String stockType);

    StockListResponse getStockList(Long animalId, String stockType);

    void buyStock(Long animalId, BuyStockRequest buyStockRequest);

    void sellStock(Long animalId, SellStockRequest sellStockRequest);

}
