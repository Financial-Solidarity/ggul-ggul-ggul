package com.ggul.application.springconfig.security.service;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.UUID;

@Getter
public class UserLoginContext extends User {

    private final UUID userId;
    private final String email;

    public UserLoginContext( Collection<? extends GrantedAuthority> authorities, com.ggul.application.user.domain.User user) {
        super(user.getUsername(), user.getPassword().getValue(), authorities);
        this.userId = user.getId();
        this.email = user.getUsername();
    }

}
