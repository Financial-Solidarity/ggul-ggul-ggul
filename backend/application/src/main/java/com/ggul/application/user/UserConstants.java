package com.ggul.application.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserConstants {
    PROFILE_DIR("user/profile");

    private final String value;

}
