package com.zzf.backend.domain.stock.controller;

import com.zzf.backend.domain.stock.dto.BuyStockRequest;
import com.zzf.backend.domain.stock.dto.GetHoldingsResponse;
import com.zzf.backend.domain.stock.dto.SellStockRequest;
import com.zzf.backend.domain.stock.dto.StockListResponse;
import com.zzf.backend.domain.stock.service.StockService;
import com.zzf.backend.global.dto.ResponseDto;
import com.zzf.backend.global.status.SuccessCode;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.zzf.backend.global.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/stock")
public class StockController {

    private final StockService stockService;

    @GetMapping("/{stockType}")
    public ResponseDto<GetHoldingsResponse> getHoldings(@RequestHeader Long animalId,
                                                        @PathVariable String stockType) {
        GetHoldingsResponse holdings = stockService.getHoldings(animalId, stockType);

        return ResponseDto.success(GET_HOLDINGS_SUCCESS, holdings);
    }

    @GetMapping("/list/{stockType}")
    public ResponseDto<StockListResponse> getStockList(@RequestHeader Long animalId,
                                                       @PathVariable String stockType) {
        StockListResponse stockList = stockService.getStockList(animalId, stockType);

        return ResponseDto.success(GET_STOCK_LIST_SUCCESS, stockList);
    }

    @GetMapping("/{stockId}")
    public ResponseDto<?> getStockInfo(@RequestHeader Long animalId,
                                       @PathVariable Long stockId) {


        return ResponseDto.success(null);
    }

    @GetMapping("/statements/{stockId}")
    public ResponseDto<?> getStockStatements(@RequestHeader Long animalId,
                                             @PathVariable Long stockId) {


        return ResponseDto.success(null);
    }

    @PostMapping("/buy")
    public ResponseDto<?> buyStock(@RequestHeader Long animalId,
                                   @RequestBody BuyStockRequest buyStockRequest) {
        stockService.buyStock(animalId, buyStockRequest);

        return ResponseDto.success(BUY_STOCK_SUCCESS);
    }

    @PostMapping("/sell")
    public ResponseDto<?> sellStock(@RequestHeader Long animalId,
                                    @RequestBody SellStockRequest sellStockRequest) {
        stockService.sellStock(animalId, sellStockRequest);

        return ResponseDto.success(SELL_STOCK_SUCCESS);
    }

}
