package com.ggul.application.admin.ui.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AdminTokenGrantRequest {
    private String email;
    private Long quantity;
}
