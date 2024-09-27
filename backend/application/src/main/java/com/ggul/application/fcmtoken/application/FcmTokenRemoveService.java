
package com.ggul.application.fcmtoken.application;


import com.ggul.application.fcmtoken.domain.FcmTokenRepository;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FcmTokenRemoveService {
    private final FcmTokenRepository fcmTokenRepository;
    private final UserRepository userRepository;

    @Transactional
    public void removeFcmToken(UUID userId, String sessionId) {
        fcmTokenRepository.deleteByUser_IdAndSessionId(userId, sessionId);
    }
}
