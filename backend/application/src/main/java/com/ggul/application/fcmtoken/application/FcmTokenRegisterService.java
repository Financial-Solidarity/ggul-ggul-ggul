package com.ggul.application.fcmtoken.application;


import com.ggul.application.fcmtoken.application.dto.FcmTokenRegisterRequest;
import com.ggul.application.fcmtoken.domain.FcmToken;
import com.ggul.application.fcmtoken.domain.FcmTokenRepository;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FcmTokenRegisterService {
    private final FcmTokenRepository fcmTokenRepository;
    private final UserRepository userRepository;

    @Transactional
    public void registerFcmToken(FcmTokenRegisterRequest request, UUID userId, String sessionId) {
        Optional<FcmToken> byUserIdAndToken = fcmTokenRepository.findByUserIdAndToken(userId, request.getFcmToken());
        if(byUserIdAndToken.isPresent()) {
            FcmToken target = byUserIdAndToken.get();
            target.onForeground();
        }else {
            User user = userRepository.getReferenceById(userId);
            FcmToken build = FcmToken.builder().token(request.getFcmToken()).user(user).sessionId(sessionId).build();
            fcmTokenRepository.save(build);
        }
    }
}
