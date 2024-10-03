package com.ggul.application.notification.ui;

import com.ggul.application.notification.query.NotificationFindService;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/notifications")
@RestController
public class NotificationController {
    private final NotificationFindService notificationFindService;

    @GetMapping
    public ResponseEntity<?> getNotifications(Pageable pageable, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(notificationFindService.findNotificationView(pageable, userLoginContext.getUserId()));
    }
}
