package com.ggul.application.user.application.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserInfoModifyRequest {
    private String nickname;
    private String nowPassword;
    private String newPassword;
    private Boolean isProfileImgRemove;
}
