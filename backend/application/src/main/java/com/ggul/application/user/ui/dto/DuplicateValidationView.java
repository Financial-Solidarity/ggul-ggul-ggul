package com.ggul.application.user.ui.dto;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DuplicateValidationView {
    private Boolean isDuplicated;
}
