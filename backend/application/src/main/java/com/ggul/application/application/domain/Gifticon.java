package com.ggul.application.application.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "gifticon")
@Entity
public class Gifticon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gifticon_id")
    private Integer id;


}
