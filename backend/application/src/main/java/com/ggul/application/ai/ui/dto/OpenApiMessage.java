package com.ggul.application.ai.ui.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class OpenApiMessage {
    private String role;
    private String content;
}
