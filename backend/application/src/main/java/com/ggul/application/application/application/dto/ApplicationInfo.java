package com.ggul.application.application.application.dto;

import com.ggul.application.application.domain.Application;
import com.ggul.application.application.domain.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationInfo {
    private Long id;
    private String title;
    private String imageUrl;
    private Double probability;
    private Long price;
    private Long maxWinnerCount;
    private Status status;
    private LocalDateTime createdAt;

    public static ApplicationInfo from(Application application){
        return ApplicationInfo.builder()
                .id(application.getId())
                .title(application.getTitle())
                .imageUrl(application.getImageUrl())
                .probability(application.getProbability())
                .price(application.getPrice())
                .maxWinnerCount(application.getMaxWinnerCount())
                .status(application.getStatus())
                .createdAt(application.getCreatedAt())
                .build();
    }
}
