package com.ggul.application.payment.ui;

import com.ggul.application.payment.application.PaymentService;
import com.ggul.application.payment.application.dto.PaymentRequest;
import com.ggul.application.payment.query.ConsumptionLogFindService;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RequiredArgsConstructor
@RequestMapping("/payment")
@RestController
public class PaymentController {
    private final PaymentService paymentService;
    private final ConsumptionLogFindService consumptionLogFindService;
    @PostMapping()
    public ResponseEntity<?> paymentRequest(@RequestBody PaymentRequest paymentRequest, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(paymentService.payment(paymentRequest, userLoginContext.getUserId()));
    }

    @GetMapping("/search")
    public ResponseEntity<?> paymentList(@RequestParam(name = "start-date") @DateTimeFormat(pattern = "yyyy-MM") LocalDate startDate,
                                         @RequestParam(name = "end-date") @DateTimeFormat(pattern = "yyyy-MM") LocalDate endDate,
                                         Pageable pageable, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(consumptionLogFindService.findAll(userLoginContext.getUserId(), pageable, startDate, endDate));
    }

    @GetMapping("/search")
    public ResponseEntity<?> chartValue(@RequestParam(name = "start-date") @DateTimeFormat(pattern = "yyyy-MM") LocalDate startDate,
                                         @RequestParam(name = "end-date") @DateTimeFormat(pattern = "yyyy-MM") LocalDate endDate,
                                         @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(consumptionLogFindService.findChartValue(userLoginContext.getUserId(), startDate, endDate));
    }
}
