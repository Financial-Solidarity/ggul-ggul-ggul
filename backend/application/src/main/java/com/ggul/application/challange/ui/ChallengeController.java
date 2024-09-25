package com.ggul.application.challange.ui;

import com.ggul.application.challange.application.ChallengeJoinService;
import com.ggul.application.challange.application.ChallengeReadyService;
import com.ggul.application.challange.application.ChallengeRegisterService;
import com.ggul.application.challange.application.dto.ChallengeExitRequest;
import com.ggul.application.challange.application.dto.ChallengeJoinRequest;
import com.ggul.application.challange.application.dto.ChallengeReadyRequest;
import com.ggul.application.challange.application.dto.ChallengeRegisterRequest;
import com.ggul.application.challange.application.schedule.ChallengeExitService;
import com.ggul.application.challange.query.ChallengeFindService;
import com.ggul.application.challange.query.ChallengeParticipantFindService;
import com.ggul.application.challange.ui.dto.ChallengeParticipantListView;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import com.ggul.application.challange.ui.dto.ChallengeView;
import com.ggul.application.common.domain.password.Password;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/challenges")
@RestController
public class ChallengeController {
    private final ChallengeRegisterService challengeRegisterService;
    private final ChallengeJoinService challengeJoinService;
    private final ChallengeFindService challengeFindService;
    private final ChallengeReadyService challengeReadyService;
    private final ChallengeExitService challengeExitService;
    private final ChallengeParticipantFindService challengeParticipantFindService;

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

    @PostMapping("/join")
    public ResponseEntity<?> joinChallenge(@RequestBody ChallengeJoinRequest request, @AuthenticationPrincipal UserLoginContext context) {
        challengeJoinService.join(request.getChallengeId(), context.getUserId(), Password.of(request.getPassword(), false));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/ready")
    public ResponseEntity<?> challengeReady(@RequestBody ChallengeReadyRequest readyRequest, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        challengeReadyService.ready(readyRequest, userLoginContext.getUserId());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/exit")
    public ResponseEntity<?> challengeExit(@RequestBody ChallengeExitRequest request, @AuthenticationPrincipal UserLoginContext context) {
        challengeExitService.challengeExit(request, context.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{challengeId}/participants")
    public ResponseEntity<?> challengeParticipantList(@PathVariable UUID challengeId, @AuthenticationPrincipal UserLoginContext context) {
        List<ChallengeParticipantView> challengeParticipantViews = challengeParticipantFindService.findAllByChallengeId(challengeId, context.getUserId());
        return ResponseEntity.ok(new ChallengeParticipantListView(challengeParticipantViews));
    }
}
