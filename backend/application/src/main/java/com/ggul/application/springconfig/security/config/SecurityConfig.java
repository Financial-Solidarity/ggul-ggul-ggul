package com.ggul.application.springconfig.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ggul.application.springconfig.security.filter.JsonLoginAuthenticationFilter;
import com.ggul.application.springconfig.security.handler.CustomAccessDeniedHandler;
import com.ggul.application.springconfig.security.handler.CustomAuthEntryPoint;
import com.ggul.application.springconfig.security.handler.JsonAuthFailureHandler;
import com.ggul.application.springconfig.security.handler.JsonAuthSuccessHandler;
import com.ggul.application.springconfig.security.provider.JsonLoginAuthenticationProvider;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler(){
        return new JsonAuthSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler(){
        return new JsonAuthFailureHandler();
    }

    @Bean
    public AuthenticationEntryPoint accessAuthEntryPoint() {
        return new CustomAuthEntryPoint();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider jsonAuthenticationProvider(){
        return new JsonLoginAuthenticationProvider(userDetailsService, bCryptPasswordEncoder());
    }

    @Bean
    public AccessDeniedHandler jsonAccessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }



    public JsonLoginAuthenticationFilter jsonLoginAuthenticationFilter(AuthenticationManager authenticationManager) {
        JsonLoginAuthenticationFilter filter = new JsonLoginAuthenticationFilter(objectMapper, authenticationManager);
        filter.setAuthenticationFailureHandler(authenticationFailureHandler());
        filter.setAuthenticationSuccessHandler(authenticationSuccessHandler());

        return filter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.formLogin(AbstractHttpConfigurer::disable);
        http.httpBasic(AbstractHttpConfigurer::disable);
        http.anonymous(AbstractHttpConfigurer::disable);

        AuthenticationManager authenticationManager = authenticationManager(http.getSharedObject(AuthenticationConfiguration.class));
        ProviderManager p = (ProviderManager) authenticationManager;
        p.getProviders().add(jsonAuthenticationProvider());

        http.authorizeHttpRequests((auth) -> auth.requestMatchers("/", "/auth/**").permitAll()
                .anyRequest().authenticated());

        http.addFilterAt(jsonLoginAuthenticationFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class);

        http.sessionManagement(httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer
                        .sessionCreationPolicy(SessionCreationPolicy.NEVER));
        http.exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                httpSecurityExceptionHandlingConfigurer
                        .authenticationEntryPoint(accessAuthEntryPoint()));

        return http.build();
    }
}
