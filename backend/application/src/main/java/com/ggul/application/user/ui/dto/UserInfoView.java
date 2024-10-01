package com.ggul.application.user.ui.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserInfoView {
    private UUID userId;
    private String username;
    private String nickname;
    private String profileImg;
}
