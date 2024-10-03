package com.ggul.application.market.ui;

import com.ggul.application.market.application.MarketService;
import com.ggul.application.market.application.dto.MarketSearchDto;
import com.ggul.application.market.domain.Status;
import com.ggul.application.market.ui.request.MarketSellRequest;
import com.ggul.application.market.ui.response.MarketSellResponse;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/markets")
@AllArgsConstructor
public class MarketController {

    private final MarketService marketService;

    @PostMapping
    public ResponseEntity<?> sellEquipment(@AuthenticationPrincipal UserLoginContext userLoginContext,
                                           @RequestBody MarketSellRequest request){
        UUID marketId = marketService.sellEquipment(request.toDto(userLoginContext.getUserId()));
        return ResponseEntity.ok().body(MarketSellResponse
                .builder()
                .marketId(marketId)
                .build());
    }

    @PostMapping("/{marketId}/buy")
    public ResponseEntity<?> buyEquipment(@AuthenticationPrincipal UserLoginContext userLoginContext,
                                          @PathVariable UUID marketId) {
        marketService.buyEquipment(userLoginContext.getUserId(), marketId);
        return ResponseEntity.ok().body(null);
    }

    @DeleteMapping("/{marketId}")
    public ResponseEntity<?> cancelSellEquipment(@AuthenticationPrincipal UserLoginContext userLoginContext,
                                          @PathVariable UUID marketId) {
        marketService.cancelSellEquipment(userLoginContext.getUserId(), marketId);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/{marketId}")
    public ResponseEntity<?> getMarket(@PathVariable UUID marketId) {
        return ResponseEntity.ok().body(marketService.getMarket(marketId));
    }

    @GetMapping
    public ResponseEntity<?> getMarkets(@AuthenticationPrincipal UserLoginContext userLoginContext,
                                        @RequestParam(value = "min-power", required = false) Long minPower,
                                        @RequestParam(value = "max-power", required = false) Long maxPower,
                                        @RequestParam(value = "min-price", required = false) Long minPrice,
                                        @RequestParam(value = "max-price", required = false) Long maxPrice,
                                        @RequestParam(required = false) String name,
                                        @RequestParam(required = false) Boolean own,
                                        @RequestParam(required = false) String status,
                                        Pageable pageable) {
        return ResponseEntity.ok().body(marketService.getMarkets(MarketSearchDto.builder()
                .userId(userLoginContext.getUserId())
                .minPower(minPower)
                .maxPower(maxPower)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .name(name)
                .own(own)
                .status(status != null ? Status.valueOf(status) : null)
                .pageable(pageable)
                .build()));
    }
}
