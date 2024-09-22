package com.ggul.application.challange.ui;

import com.ggul.application.challange.application.ChallengeRegisterService;
import com.ggul.application.challange.application.dto.ChallengeRegisterRequest;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/challenges")
@RestController
public class ChallengeController {
    private final ChallengeRegisterService challengeRegisterService;

    @PostMapping()
    public ResponseEntity<?> challengeCreate(@RequestBody ChallengeRegisterRequest request, @AuthenticationPrincipal UserLoginContext context) {
        UUID challengeId = challengeRegisterService.createChallenge(request, context.getUserId());
        return ResponseEntity.ok(ChallengeCreateView.builder().challengeId(challengeId).build());
    }
}
