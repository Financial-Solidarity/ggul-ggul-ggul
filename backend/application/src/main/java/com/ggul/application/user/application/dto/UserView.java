package com.ggul.application.user.application.dto;

import com.ggul.application.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;
@Getter
@Builder
@AllArgsConstructor
public class UserView {
    private final UUID id;
    private final String username;
    private final String nickname;
    private final String profile;

    public static UserView from(User user){
        return UserView.builder()
                .id(user.getId())
                .username(user.getUsername())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .build();
    }
}
