package com.ggul.application.fcmtoken.application;


import com.ggul.application.fcmtoken.application.dto.FcmTokenRegisterRequest;
import com.ggul.application.fcmtoken.domain.FcmToken;
import com.ggul.application.fcmtoken.domain.FcmTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FcmTokenRegisterService {
    private final FcmTokenRepository fcmTokenRepository;


    @Transactional
    public void registerFcmToken(FcmTokenRegisterRequest request, UUID userId) {
        if(fcmTokenRepository.existsByUserIdAndToken(userId, request.getFcmToken())) {
            return;
        }

        FcmToken build = FcmToken.builder().token(request.getFcmToken()).userId(userId).build();
        fcmTokenRepository.save(build);
    }
}
