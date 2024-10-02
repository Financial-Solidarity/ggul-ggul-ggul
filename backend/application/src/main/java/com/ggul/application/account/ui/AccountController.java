package com.ggul.application.account.ui;

import com.ggul.application.account.application.CreateUserService;
import com.ggul.application.account.ui.dto.CreateUserRequest;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
@Slf4j
public class AccountController {
    private final CreateUserService createUserService;
    private final UserRepository userRepository;

    @PostMapping("/users")
    public ResponseEntity<?> createUsers(@RequestBody CreateUserRequest createUserRequest, @AuthenticationPrincipal UserLoginContext userLoginContext){
        createUserService.createUser(createUserRequest, userLoginContext.getUserId());

        return ResponseEntity.ok(null);
    }

}
