package com.ggul.application.payment.application;

import com.ggul.application.account.application.AccountWithdrawalService;
import com.ggul.application.common.event.Events;
import com.ggul.application.payment.application.dto.PaymentRequest;
import com.ggul.application.payment.domain.ConsumptionLog;
import com.ggul.application.payment.domain.ProductCategory;
import com.ggul.application.payment.domain.repository.ConsumptionLogRepository;
import com.ggul.application.payment.domain.repository.ProductCategoryRepository;
import com.ggul.application.payment.event.PaymentCompletedEvent;
import com.ggul.application.payment.ui.dto.PaymentRequestResponseView;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.wallet.application.WalletService;
import com.ggul.application.wallet.domain.Category;
import com.ggul.application.wallet.domain.WalletHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PaymentService {
    private final ConsumptionLogRepository consumptionLogRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final UserRepository userRepository;
    private final WalletService walletService;
    private final AccountWithdrawalService accountWithdrawalService;

    @Transactional
    public PaymentRequestResponseView payment(PaymentRequest paymentRequest, UUID sessionId) {
        //TODO : Account를 가져오고, Account의 금액 조회하고 Account 결제하기.
        walletService.useToken(sessionId, paymentRequest.getSpendGgulToken().longValue());
        Integer newRequiredMoney = paymentRequest.getRequiredMoney() - paymentRequest.getSpendGgulToken();
        accountWithdrawalService.accountWithdraw(newRequiredMoney, sessionId);
        User user = userRepository.getReferenceById(sessionId);
        ProductCategory productCategory = productCategoryRepository.getReferenceById(paymentRequest.getCategoryId());

        WalletHistory history = walletService.registerWalletHistory(sessionId, false, paymentRequest.getSpendGgulToken().longValue(), Category.PAYMENT);

        ConsumptionLog consumptionLog = ConsumptionLog.create(paymentRequest, history, newRequiredMoney, user, productCategory);

        ConsumptionLog save = consumptionLogRepository.save(consumptionLog);
        Events.raise(new PaymentCompletedEvent(save.getId(), user.getId(), newRequiredMoney, paymentRequest.getProductName(), paymentRequest.getMarket(), productCategory.getName()));

        return new PaymentRequestResponseView(newRequiredMoney);
    }
}
