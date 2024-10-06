package com.ggul.application.user.application;

import com.ggul.application.fcmtoken.domain.FcmTokenRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class LogoutService {
    private final FcmTokenRepository fcmTokenRepository;
    private final HttpSession httpSession;

    @Transactional
    public void logout(UUID userId) {
        httpSession.invalidate();
        fcmTokenRepository.deleteByUser_IdAndSessionId(userId, httpSession.getId());
    }
}
