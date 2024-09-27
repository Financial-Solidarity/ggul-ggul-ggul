package com.ggul.application.payment.ui;

import com.ggul.application.payment.application.PaymentService;
import com.ggul.application.payment.application.dto.PaymentRequest;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RequestMapping("/payment")
@RestController
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping()
    public ResponseEntity<?> paymentRequest(@RequestBody PaymentRequest paymentRequest, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(paymentService.payment(paymentRequest, userLoginContext.getUserId()));
    }
}
