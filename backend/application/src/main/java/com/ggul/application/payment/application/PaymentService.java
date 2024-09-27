package com.ggul.application.payment.application;

import com.ggul.application.common.event.Events;
import com.ggul.application.payment.application.dto.PaymentRequest;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.domain.ProductCategory;
import com.ggul.application.payment.domain.repository.ConsumptionLogRepository;
import com.ggul.application.payment.domain.repository.ProductCategoryRepository;
import com.ggul.application.payment.event.PaymentCompletedEvent;
import com.ggul.application.payment.ui.dto.PaymentRequestResponseView;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PaymentService {
    private final ConsumptionLogRepository consumptionLogRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UserRepository userRepository;

    @Transactional
    public PaymentRequestResponseView payment(PaymentRequest paymentRequest, UUID sessionId) {
        //TODO : Account를 가져오고, Account의 금액 조회하고 Account 결제하기.
        //TODO : GGUL 코인 조회하고, GGUL 코인을 가지고 결제하기. GGUL 코인은 master account로 전송.
        Integer newRequiredMoney = paymentRequest.getRequiredMoney() - paymentRequest.getSpendGgulToken();
        User user = userRepository.getReferenceById(sessionId);
        ProductCategory productCategory = productCategoryRepository.getReferenceById(paymentRequest.getCategoryId());
        ConsumptionLog consumptionLog = ConsumptionLog.create(paymentRequest, newRequiredMoney, user, productCategory);

        ConsumptionLog save = consumptionLogRepository.save(consumptionLog);
        Events.raise(new PaymentCompletedEvent(save.getId(), user.getId(), newRequiredMoney, paymentRequest.getProductName(), paymentRequest.getMarket()));

        return new PaymentRequestResponseView(newRequiredMoney);
    }
}
