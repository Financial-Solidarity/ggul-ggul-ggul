package com.ggul.application.springconfig.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggul.application.springconfig.security.service.UserLoginContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;

import java.io.IOException;

@AllArgsConstructor
public class JsonAuthSuccessHandler implements AuthenticationSuccessHandler {
    private final Logger logger = LoggerFactory.getLogger(JsonAuthSuccessHandler.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    private SecurityContextRepository securityContextRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth) throws IOException, ServletException {
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        logger.info("{}", auth);
        securityContext.setAuthentication(auth);
        SecurityContextHolder.setContext(securityContext);
        securityContextRepository.saveContext(securityContext, req, res);
        UserLoginContext user = (UserLoginContext) auth.getPrincipal(); //인증 객체로부터 인증 성공 시 저장한 Account 객체 받아오기

        res.setStatus(HttpStatus.OK.value());
        res.setContentType(MediaType.APPLICATION_JSON_VALUE);


    }

}
