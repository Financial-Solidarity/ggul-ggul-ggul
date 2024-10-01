package com.ggul.application.notification.query;

import com.ggul.application.notification.domain.NotificationRepository;
import com.ggul.application.notification.ui.dto.NotificationView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;


@RequiredArgsConstructor
@Service
public class NotificationFindService {
    private final NotificationRepository notificationRepository;

    @Transactional(readOnly = true)
    public Slice<NotificationView> findNotificationView(Pageable pageable, UUID userId) {
        return notificationRepository.findAllByUserId(userId, pageable);
    }
}
