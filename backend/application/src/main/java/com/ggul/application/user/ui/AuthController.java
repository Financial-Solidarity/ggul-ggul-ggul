package com.ggul.application.user.ui;

import com.ggul.application.user.query.UserFindService;
import com.ggul.application.user.query.dto.EmailDuplicateCheckRequest;
import com.ggul.application.user.query.dto.NicknameDuplicateCheckRequest;
import com.ggul.application.user.ui.dto.DuplicateValidationView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {
    private final UserFindService userFindService;

    @PostMapping("/users/email/duplicate")
    public ResponseEntity<?> getEmailDuplicateCheck(@RequestBody EmailDuplicateCheckRequest request) {
        DuplicateValidationView duplicateValidationView = userFindService.emailDuplicateCheck(request);
        return ResponseEntity.ok(duplicateValidationView);
    }

    @PostMapping("/users/nickname/duplicate")
    public ResponseEntity<?> getEmailDuplicateCheck(@RequestBody NicknameDuplicateCheckRequest request) {
        DuplicateValidationView duplicateValidationView = userFindService.nicknameDuplicateCheck(request);
        return ResponseEntity.ok(duplicateValidationView);
    }

}
