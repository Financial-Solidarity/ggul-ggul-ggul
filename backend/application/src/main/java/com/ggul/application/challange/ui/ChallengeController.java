package com.ggul.application.challange.ui;

import com.ggul.application.challange.application.ChallengeJoinService;
import com.ggul.application.challange.application.ChallengeRegisterService;
import com.ggul.application.challange.application.dto.ChallengeRegisterRequest;
import com.ggul.application.challange.query.ChallengeFindService;
import com.ggul.application.challange.ui.dto.ChallengeView;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/challenges")
@RestController
public class ChallengeController {
    private final ChallengeRegisterService challengeRegisterService;
    private final ChallengeJoinService challengeJoinService;
    private final ChallengeFindService challengeFindService;

    @PostMapping()
    public ResponseEntity<?> challengeCreate(@RequestBody ChallengeRegisterRequest request, @AuthenticationPrincipal UserLoginContext context) {
        return ResponseEntity.ok(challengeRegisterService.createChallenge(request, context.getUserId()));
    }

    @GetMapping("/{challengeId}")
    public ResponseEntity<?> getChallenge(@PathVariable UUID challengeId) {
        ChallengeView challengeDto = challengeFindService.getChallenge(challengeId);
        return ResponseEntity.ok(challengeDto);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getChallengeSearch(@RequestParam(value = "title", required = false) String title, Pageable pageable) {
        return ResponseEntity.ok(challengeFindService.getChallenges(title, pageable));
    }

    @PostMapping("/{challengeId}/join")
    public ResponseEntity<?> joinChallenge(@PathVariable UUID challengeId, @AuthenticationPrincipal UserLoginContext context) {
        challengeJoinService.join(challengeId, context.getUserId());
        return ResponseEntity.ok().build();
    }
}
