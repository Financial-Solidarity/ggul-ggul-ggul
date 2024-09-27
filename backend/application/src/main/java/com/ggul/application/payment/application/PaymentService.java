package com.ggul.application.payment.application;

import com.ggul.application.common.event.Events;
import com.ggul.application.payment.application.dto.PaymentRequest;
import com.ggul.application.payment.domain.repository.ConsumptionLogRepository;
import com.ggul.application.payment.ui.dto.PaymentRequestResponseView;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PaymentService {
    private final ConsumptionLogRepository consumptionLogRepository;

    @Transactional
    public PaymentRequestResponseView payment(PaymentRequest paymentRequest, UUID sessionId) {
        //TODO : Account를 가져오고, Account의 금액 조회하고 Account 결제하기.
        //TODO : GGUL 코인 조회하고, GGUL 코인을 가지고 결제하기. GGUL 코인은 master account로 전송.


        Events.raise();
    }
}
