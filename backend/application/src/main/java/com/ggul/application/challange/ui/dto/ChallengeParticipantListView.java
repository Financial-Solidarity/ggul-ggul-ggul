package com.ggul.application.challange.ui.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeParticipantListView {
    private List<ChallengeParticipantView> list;
}
