package com.ggul.application.user.application;

import com.ggul.application.common.domain.password.Password;
import com.ggul.application.user.application.dto.SignupRequest;
import com.ggul.application.user.application.dto.UserVerificationEmailDto;
import com.ggul.application.user.domain.User;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.user.exception.EmailVerificationNotFoundException;
import com.ggul.application.user.exception.EmailVerificationRequestNotFoundException;
import com.ggul.application.user.exception.NicknameExistException;
import com.ggul.application.user.exception.UserExistException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class SignupService {
    private final UserRepository userRepository;
    private final HttpSession httpSession;
    private static final String EMAIL_VERIFICATION_REQUEST = "EMAIL_VERIFICATION_REQUEST";

    @Transactional
    public void signup(SignupRequest request) {
        validEmail(request.getEmail());

        Password p = Password.of(request.getPassword(), false);

        User user = User.builder()
                .username(request.getEmail())
                .nickname(request.getNickname())
                .password(p)
                .build();

        httpSession.removeAttribute(EMAIL_VERIFICATION_REQUEST);

        userRepository.save(user);

    }

    private void validNickname(String nickname) {
        if(userRepository.existsByNickname(nickname)) {
            throw new NicknameExistException();
        }
    }

    private void validEmail(String email) {
        if(userRepository.findByUsername(email).isPresent()) {
            throw new UserExistException();
        }

        Object optional = httpSession.getAttribute(EMAIL_VERIFICATION_REQUEST);
        if(optional == null) {
            throw new EmailVerificationRequestNotFoundException();
        }

        UserVerificationEmailDto dto = (UserVerificationEmailDto) optional;
        if(!dto.canUse()) {
            throw new EmailVerificationNotFoundException();
        }

    }
}
