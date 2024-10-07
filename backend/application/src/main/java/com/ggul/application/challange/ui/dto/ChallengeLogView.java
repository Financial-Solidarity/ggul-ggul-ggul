package com.ggul.application.challange.ui.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeLogView {
    private ChallengeParticipantView profile;
    private Boolean isSuccess;
    private Boolean isLose;
    private Integer ggulNum;

}
