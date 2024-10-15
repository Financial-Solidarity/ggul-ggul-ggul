package com.ggul.application.ai.ui.dto;

import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class OpenApiResponse {
    private List<Choice> choices;

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Choice{
        private int index;
        private OpenApiMessage message;
    }
}
