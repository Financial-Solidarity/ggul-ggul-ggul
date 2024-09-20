package com.ggul.application.user.ui;

import com.ggul.application.springconfig.security.service.UserLoginContext;
import com.ggul.application.user.application.SignoutService;
import com.ggul.application.user.application.UserInfoModifyService;
import com.ggul.application.user.application.dto.UserInfoModifyRequest;
import com.ggul.application.user.query.UserFindService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RequestMapping("/users")
@RestController
@Slf4j
public class UserController {
    private final UserInfoModifyService userInfoModifyService;
    private final SignoutService signoutService;
    private final UserFindService userFindService;

    @RequestMapping(value = "", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> responseAuthenticationPrinciple(@AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/info")
    public ResponseEntity<?> userInfoModify(UserInfoModifyRequest request, @RequestParam MultipartFile profileImg, @AuthenticationPrincipal UserLoginContext userLoginContext) {
        userInfoModifyService.userInfoUpdate(request, profileImg, userLoginContext.getUserId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal UserLoginContext userLoginContext) {
        return ResponseEntity.ok(userFindService.findById(userLoginContext.getUserId()));
    }

    @DeleteMapping("")
    public ResponseEntity<?> signout(@AuthenticationPrincipal UserLoginContext userLoginContext) {
        signoutService.signout(userLoginContext.getUserId());
        return ResponseEntity.ok(null);
    }

}
