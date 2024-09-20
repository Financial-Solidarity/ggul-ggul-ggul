package com.ggul.application.springconfig.security.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
    Logger logger = LoggerFactory.getLogger(CustomAuthEntryPoint.class);
    @Override
    public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException e) throws IOException {
        e.printStackTrace();
        res.setContentType("application/json");
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        res.getOutputStream().println("{ \"error\": \"" + e.getMessage() + "\" }");

    }

}
