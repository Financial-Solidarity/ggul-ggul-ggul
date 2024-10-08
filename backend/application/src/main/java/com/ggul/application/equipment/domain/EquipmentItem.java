package com.ggul.application.equipment.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "equipment_item")
@Entity
public class EquipmentItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipment_item_id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "url")
    private String url;
}
