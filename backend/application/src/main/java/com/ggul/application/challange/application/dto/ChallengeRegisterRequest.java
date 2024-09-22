package com.ggul.application.challange.application.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChallengeRegisterRequest {
    @NotNull
    private String title;
    @NotNull
    private String password;
    @NotNull
    private String competitionType;
    @NotNull
    private Boolean isBlindness;
    @NotNull
    private Integer budgetCap;
}
