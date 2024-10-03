package com.ggul.application.game.ui;

import com.ggul.application.game.application.GameService;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/games")
@AllArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping("/receive")
    public ResponseEntity<?> getReceivableTokenInfo(@AuthenticationPrincipal UserLoginContext context){
        return ResponseEntity.ok().body(gameService.getReceivableTokenInfo(context.getUserId()));
    }

    @PostMapping("/receive")
    public ResponseEntity<?> receiveToken(@AuthenticationPrincipal UserLoginContext context){
        gameService.receiveToken(context.getUserId());
        return ResponseEntity.ok().body(null);
    }

}
