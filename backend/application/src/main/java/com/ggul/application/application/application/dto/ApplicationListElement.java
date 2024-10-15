package com.ggul.application.application.application.dto;

import com.ggul.application.application.domain.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationListElement {
    private Long id;
    private String title;
    private String imageUrl;
    private Double probability;
    private Long price;
    private Status status;
    private LocalDateTime createdAt;
}
