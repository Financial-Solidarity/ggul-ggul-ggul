package com.ggul.application.user.query.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class EmailDuplicateCheckRequest {
    private String email;
}
