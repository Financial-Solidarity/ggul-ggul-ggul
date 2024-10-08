package com.ggul.application.application.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class ApplicationRegisterDto {
    private MultipartFile image;
    private String title;
    private Double probability;
    private Long price;
    private Long maxWinnerCount;
}
