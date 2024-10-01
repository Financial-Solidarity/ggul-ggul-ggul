package com.ggul.application.equipment.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TokenizedEquipmentRepository extends JpaRepository<TokenizedEquipment, UUID> {

}
