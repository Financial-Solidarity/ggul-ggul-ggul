package com.ggul.application.user.application;

import com.ggul.application.common.event.Events;
import com.ggul.application.user.application.dto.EmailVerificationNumRequest;


import com.ggul.application.user.application.dto.EmailVerificationRequest;
import com.ggul.application.user.application.dto.UserVerificationEmailDto;
import com.ggul.application.user.domain.UserRepository;
import com.ggul.application.common.infra.mailsender.MailSenderRequest;
import com.ggul.application.user.exception.EmailVerificationRequestNotFoundException;
import com.ggul.application.user.exception.UserExistException;
import com.ggul.application.user.ui.dto.EmailVerificationView;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;


@Service
@RequiredArgsConstructor
public class EmailVerificationService {
    private final UserRepository userRepository;
    private static final String EMAIL_VERIFICATION_REQUEST = "EMAIL_VERIFICATION_REQUEST";
    private static final String EMAIL_VERIFICATION = "EMAIL_VERIFICATION";
    private final HttpSession httpSession;

    @Transactional(readOnly = true)
    public void emailVerificationRequest(EmailVerificationNumRequest request) {
        if(userRepository.existsByUsername(request.getEmail())) {
            throw new UserExistException();
        }

        emailNumberRequest(request);
    }

    @Transactional(readOnly = true)
    public EmailVerificationView emailVerify(EmailVerificationRequest request) {
        return EmailVerificationView.builder().isValid(verifyEmail(request)).build();
    }

    private void emailNumberRequest(EmailVerificationNumRequest request) {


        String randomNumStr = GenerateRandomNumber.getStr(6);

        UserVerificationEmailDto userVerificationEmailDto = UserVerificationEmailDto.builder()
                .email(request.getEmail())
                .verificationNumber(randomNumStr)
                .build();

        httpSession.setAttribute(EMAIL_VERIFICATION_REQUEST, userVerificationEmailDto);

        Events.raise(MailSenderRequest.builder()
                .toEmail(request.getEmail())
                .subject("[GGUL3]이메일 인증 코드 발송 안내입니다.")
                .variables(Map.of("verificationNumber", randomNumStr))
                .templatePath("email-verification-number-template")
                .build()
        );
    }

    private boolean verifyEmail(EmailVerificationRequest request) {
        Object value = httpSession.getAttribute(EMAIL_VERIFICATION_REQUEST);
        if(value == null) {
            throw new EmailVerificationRequestNotFoundException();
        }
        UserVerificationEmailDto userVerificationEmailDto = (UserVerificationEmailDto) value;

        if(userVerificationEmailDto.verify(request)) {
            httpSession.setAttribute(EMAIL_VERIFICATION, userVerificationEmailDto);
            return true;
        }
        return false;
    }
}
