package com.ggul.application.fcmtoken.ui;

import com.ggul.application.fcmtoken.application.FcmTokenRegisterService;
import com.ggul.application.fcmtoken.application.dto.FcmTokenRegisterRequest;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/fcm")
@RestController
public class FcmTokenController {
    private final FcmTokenRegisterService fcmTokenRegisterService;
    private final HttpSession httpSession;

    @PostMapping()
    public ResponseEntity<?> fcmTokenAdd(@RequestBody FcmTokenRegisterRequest request, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        fcmTokenRegisterService.registerFcmToken(request, userLoginContext.getUserId(), httpSession.getId());
        return ResponseEntity.ok(null);
    }
}
