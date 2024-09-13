package com.ggul.application.user.application.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SignupRequest {
    private String email;
    private String nickname;
    private String password;
}
