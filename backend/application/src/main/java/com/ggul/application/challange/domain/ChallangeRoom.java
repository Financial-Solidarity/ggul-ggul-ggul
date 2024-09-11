package com.ggul.application.challange.domain;

import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table
@Entity(name = "challangeroom")
public class ChallangeRoom {
    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    @UUIDv7
    private UUID id;

    private String title;

    private Boolean passwordExist;

    private String password;

    private User owner;

    private
}
