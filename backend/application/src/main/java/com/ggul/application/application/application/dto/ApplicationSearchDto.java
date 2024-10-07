package com.ggul.application.application.application.dto;

import com.ggul.application.application.domain.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationSearchDto {
    private UUID userId;
    private String order;
    private Boolean asc;
    private Boolean success;
    private Status status;
    private Pageable pageable;
}
