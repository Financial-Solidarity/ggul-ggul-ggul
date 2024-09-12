package com.ggul.application.equipment.domain;

import com.ggul.application.common.jpa.domain.BaseEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "equipment")
@Entity
@AttributeOverride(name = "createdAt", column = @Column(name = "acquired_at"))
public class Equipment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipment_id")
    @UUIDv7
    private UUID id;

    @Column(name = "equipment_name")
    private String name;

    @Column(name = "equipment_status")
    private Integer status;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

}
