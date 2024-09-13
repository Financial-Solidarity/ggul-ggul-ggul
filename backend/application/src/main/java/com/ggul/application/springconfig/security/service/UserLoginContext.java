package com.ggul.application.springconfig.security.service;

import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.io.Serializable;
import java.util.Collection;
import java.util.UUID;

@Getter
@ToString
public class UserLoginContext extends User implements Serializable {

    private final UUID userId;
    private final String email;

    public UserLoginContext( Collection<? extends GrantedAuthority> authorities, com.ggul.application.user.domain.User user) {
        super(user.getUsername(), user.getPassword().getValue(), authorities);
        this.userId = user.getId();
        this.email = user.getUsername();
    }

}
