package com.ggul.application.challange.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blind_nickname")
@Entity
public class BlindNickname {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blind_nickname_id")
    private Integer id;

    @Column(name = "blind_nickname")
    private String nickname;
}
