package com.ggul.application.challange.ui;

import com.ggul.application.challange.application.ChallengeJoinService;
import com.ggul.application.challange.application.ChallengeReadyService;
import com.ggul.application.challange.application.ChallengeRegisterService;
import com.ggul.application.challange.application.ChallengeTeamChangeService;
import com.ggul.application.challange.application.dto.*;
import com.ggul.application.challange.application.ChallengeExitService;
import com.ggul.application.challange.query.ChallengeFindService;
import com.ggul.application.challange.query.ChallengeLogFindService;
import com.ggul.application.challange.query.ChallengeParticipantFindService;
import com.ggul.application.challange.ui.dto.ChallengeLogView;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import com.ggul.application.challange.ui.dto.ChallengeView;
import com.ggul.application.common.domain.password.Password;
import com.ggul.application.payment.query.ConsumptionLogFindService;
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
    private final ChallengeTeamChangeService challengeTeamChangeService;
    private final ConsumptionLogFindService consumptionLogFindService;
    private final ChallengeLogFindService challengeLogFindService;

    @PostMapping()
    public ResponseEntity<?> challengeCreate(@RequestBody ChallengeRegisterRequest request, @AuthenticationPrincipal UserLoginContext context) {
        return ResponseEntity.ok(challengeRegisterService.createChallenge(request, context.getUserId()));
    }

    @GetMapping("/{challengeId}")
    public ResponseEntity<?> getChallenge(@PathVariable(name = "challengeId") UUID challengeId, @AuthenticationPrincipal UserLoginContext context) {
        ChallengeView challengeDto = challengeFindService.getChallenge(challengeId, context.getUserId());
        return ResponseEntity.ok(challengeDto);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getChallengeSearch(@RequestParam(value = "title", required = false) String title, Pageable pageable, @AuthenticationPrincipal UserLoginContext context) {
        return ResponseEntity.ok(challengeFindService.getChallenges(title, context.getUserId(), pageable));
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinChallenge(@RequestBody ChallengeJoinRequest request, @AuthenticationPrincipal UserLoginContext context) {
        challengeJoinService.joinLobby(request.getChallengeId(), context.getUserId(), Password.of(request.getPassword(), false));
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
    public ResponseEntity<?> challengeParticipantList(@PathVariable(name = "challengeId") UUID challengeId, @AuthenticationPrincipal UserLoginContext context) {
        List<ChallengeParticipantView> challengeParticipantViews = challengeParticipantFindService.findAllByChallengeId(challengeId, context.getUserId());
        return ResponseEntity.ok(challengeParticipantViews);
    }

    @PatchMapping("/team")
    public ResponseEntity<?> challengeTeam(@RequestBody ChallengeTeamChangeRequest request, @AuthenticationPrincipal UserLoginContext loginContext) {
        ChallengeParticipantView challengeParticipantView = challengeTeamChangeService.changeTeam(request, loginContext.getUserId());
        return ResponseEntity.ok(challengeParticipantView);
    }

    @GetMapping()
    public ResponseEntity<?> joinedChallengeList(@AuthenticationPrincipal UserLoginContext context) {
        return ResponseEntity.ok(challengeFindService.findAllMyChallengeAndChatting(context.getUserId()));
    }

    @GetMapping("/now")
    public ResponseEntity<?> getNowChallenge(@AuthenticationPrincipal UserLoginContext context) {
        return ResponseEntity.ok(challengeFindService.getNowChallenge(context.getUserId()));
    }

    @GetMapping("/{challengeId}/consumptions")
    public ResponseEntity<?> getConsumptionLog(@PathVariable("challengeId")UUID challengeId, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(consumptionLogFindService.findAllByChallengeId(challengeId, userLoginContext.getUserId()));
    }

    @GetMapping("/{challengeId}/result")
    public ResponseEntity<?> getChallengeResult(@PathVariable("challengeId") UUID challengeId, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        List<ChallengeLogView> all = challengeLogFindService.findAll(challengeId, userLoginContext.getUserId());
        return ResponseEntity.ok(all);
    }
}
