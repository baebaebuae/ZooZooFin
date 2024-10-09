package com.zzf.backend.domain.stock.controller;

import com.zzf.backend.domain.stock.dto.*;
import com.zzf.backend.domain.stock.service.StockService;
import com.zzf.backend.global.auth.annotation.AnimalId;
import com.zzf.backend.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/stock")
public class StockController {

    private final StockService stockService;

    @GetMapping("/{stockType}")
    public ResponseDto<GetHoldingsResponse> getHoldings(@AnimalId Long animalId,
                                                        @PathVariable String stockType) {
        GetHoldingsResponse holdings = stockService.getHoldings(animalId, stockType);

        return ResponseDto.success(GET_HOLDINGS_SUCCESS, holdings);
    }

    @GetMapping("/list/{stockType}")
    public ResponseDto<StockListResponse> getStockList(@AnimalId Long animalId,
                                                       @PathVariable String stockType) {
        StockListResponse stockList = stockService.getStockList(animalId, stockType);

        return ResponseDto.success(GET_STOCK_LIST_SUCCESS, stockList);
    }

    @GetMapping("/info/{stockId}")
    public ResponseDto<StockInfoResponse> getStockInfo(@AnimalId Long animalId,
                                                       @PathVariable Long stockId) {
        StockInfoResponse stockInfo = stockService.getStockInfo(animalId, stockId);

        return ResponseDto.success(STOCK_INFO_SUCCESS, stockInfo);
    }

    @GetMapping("/statements/{stockId}")
    public ResponseDto<StockDetailResponse> getStockDetail(@AnimalId Long animalId,
                                                           @PathVariable Long stockId) {
        StockDetailResponse stockDetail = stockService.getStockDetail(animalId, stockId);

        return ResponseDto.success(STOCK_DETAIL_SUCCESS, stockDetail);
    }

    @GetMapping("/creation/{stockId}")
    public ResponseDto<CreationUnitResponse> getCreationUnit(@AnimalId Long animalId,
                                          @PathVariable Long stockId) {
        CreationUnitResponse creationUnit = stockService.getCreationUnit(animalId, stockId);

        return ResponseDto.success(CREATION_UNIT_SUCCESS, creationUnit);
    }

    @PostMapping("/buy")
    public ResponseDto<Void> buyStock(@AnimalId Long animalId,
                                   @RequestBody BuyStockRequest buyStockRequest) {
        stockService.buyStock(animalId, buyStockRequest);

        return ResponseDto.success(BUY_STOCK_SUCCESS);
    }

    @PostMapping("/sell")
    public ResponseDto<Void> sellStock(@AnimalId Long animalId,
                                    @RequestBody SellStockRequest sellStockRequest) {
        stockService.sellStock(animalId, sellStockRequest);

        return ResponseDto.success(SELL_STOCK_SUCCESS);
    }

}
