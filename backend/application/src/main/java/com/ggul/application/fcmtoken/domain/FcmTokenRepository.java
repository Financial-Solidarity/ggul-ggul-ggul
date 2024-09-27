package com.ggul.application.fcmtoken.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FcmTokenRepository extends JpaRepository<FcmToken, Integer> {

    Boolean existsByUserIdAndToken(UUID userId, String token);

    void deleteByUser_IdAndSessionId(UUID userId, String sessionId);
}
