package com.ggul.application.user.ui.dto;

import com.ggul.application.user.domain.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private String username;
    private String nickname;
    private String profileImg;

    public static UserInfo from(User user){
        return UserInfo.builder()
                .username(user.getUsername())
                .nickname(user.getNickname())
                .profileImg(user.getProfile())
                .build();
    }
}
