package com.ggul.application.springconfig.security.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class UserLoginContext extends User {

    private final com.ggul.application.user.domain.User user;

    public UserLoginContext( Collection<? extends GrantedAuthority> authorities, com.ggul.application.user.domain.User user) {
        super(user.getUsername(), user.getPassword(), authorities);
        this.user = user;
    }

    public com.ggul.application.user.domain.User getUser() {return user;}
}
