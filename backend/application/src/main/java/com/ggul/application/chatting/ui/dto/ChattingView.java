package com.ggul.application.chatting.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ggul.application.challange.ui.dto.ChallengeParticipantView;
import com.ggul.application.payment.ui.dto.ConsumptionView;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChattingView {
    private UUID chattingId;
    private String type;
    private String content;
    private ConsumptionView consumption;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime sentAt;
    private ChallengeParticipantView profile;
}
