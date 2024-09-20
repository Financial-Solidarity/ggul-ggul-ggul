package com.ggul.application.user.ui;

import com.ggul.application.user.application.EmailVerificationService;
import com.ggul.application.user.application.SignupService;
import com.ggul.application.user.application.dto.EmailVerificationNumRequest;
import com.ggul.application.user.application.dto.EmailVerificationRequest;
import com.ggul.application.user.application.dto.SignupRequest;
import com.ggul.application.user.query.UserFindService;
import com.ggul.application.user.query.dto.EmailDuplicateCheckRequest;
import com.ggul.application.user.query.dto.NicknameDuplicateCheckRequest;
import com.ggul.application.user.ui.dto.DuplicateValidationView;
import com.ggul.application.user.ui.dto.EmailVerificationView;
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
    private final EmailVerificationService emailVerificationService;
    private final SignupService signupService;

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

    @PostMapping("/email/verification-request")
    public ResponseEntity<?> emailVerificationNumberRequest(@RequestBody EmailVerificationNumRequest request) {
        emailVerificationService.emailVerificationRequest(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/email/verification")
    public ResponseEntity<?> emailVerification(@RequestBody EmailVerificationRequest request) {
        EmailVerificationView emailVerificationView = emailVerificationService.emailVerify(request);
        return ResponseEntity.ok(emailVerificationView);
    }

    @PostMapping("/users")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        signupService.signup(request);
        return ResponseEntity.ok().build();
    }

}
