
package com.ggul.application.fcmtoken.application;


import com.ggul.application.fcmtoken.domain.FcmToken;
import com.ggul.application.fcmtoken.domain.FcmTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FcmTokenUpdateService {
    private final FcmTokenRepository fcmTokenRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updateFcmToken(UUID userId, String sessionId, String webSocketSessionId) {
        Optional<FcmToken> byUserIdAndToken = fcmTokenRepository.findByUserIdAndToken(userId, sessionId);
        if (byUserIdAndToken.isPresent()) {
            FcmToken fcmToken = byUserIdAndToken.get();
            fcmToken.setWebSocketSessionId(webSocketSessionId);
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void updateFcmTokenToBackground(UUID userId, String webSocketSessionId) {
        Optional<FcmToken> byUserIdAndToken = fcmTokenRepository.findByUserIdAndToken(userId, webSocketSessionId);
        if (byUserIdAndToken.isPresent()) {
            FcmToken fcmToken = byUserIdAndToken.get();
            fcmToken.onBackground();
        }
    }
}
