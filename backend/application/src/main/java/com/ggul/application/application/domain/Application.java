package com.ggul.application.application.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "application")
public class Application {
    @Id
    @Column(name="application_id")
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="probability")
    private Double probability;

    @Column(name="price")
    private Long price;

    @Column(name="max_winner_count")
    private Long maxWinnerCount;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.status = Status.OPEN;
        this.createdAt = LocalDateTime.now();
    }

    public void changeStatus(Status status) {
        this.status = status;
    }
}
