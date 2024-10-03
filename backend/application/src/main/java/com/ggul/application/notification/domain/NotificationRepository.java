package com.ggul.application.notification.domain;

import com.ggul.application.notification.ui.dto.NotificationView;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    @Query("SELECT new com.ggul.application.notification.ui.dto.NotificationView(n.id, n.createdAt, n.title, n.body) FROM Notification n WHERE n.user.id = :userId ORDER BY n.createdAt DESC")
    Slice<NotificationView> findAllByUserId(UUID userId, Pageable pageable);
}
