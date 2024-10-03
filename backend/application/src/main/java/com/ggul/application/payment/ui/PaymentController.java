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
import java.time.LocalDateTime;
import java.time.YearMonth;


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
    public ResponseEntity<?> paymentList(@RequestParam(name = "start-date") @DateTimeFormat(pattern = "yyyy-MM") YearMonth startDate,
                                         @RequestParam(name = "end-date") @DateTimeFormat(pattern = "yyyy-MM") YearMonth endDate,
                                         Pageable pageable, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(consumptionLogFindService.findAll(userLoginContext.getUserId(), pageable, startDate.atDay(1), endDate.atEndOfMonth()));
    }

    @GetMapping("/month/chart/search")
    public ResponseEntity<?> chartValue(@RequestParam(name = "start-date") @DateTimeFormat(pattern = "yyyy-MM") YearMonth startDate,
                                         @RequestParam(name = "end-date") @DateTimeFormat(pattern = "yyyy-MM") YearMonth endDate,
                                         @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(consumptionLogFindService.findChartValue(userLoginContext.getUserId(), startDate.atDay(1), endDate.atEndOfMonth()));
    }
}
