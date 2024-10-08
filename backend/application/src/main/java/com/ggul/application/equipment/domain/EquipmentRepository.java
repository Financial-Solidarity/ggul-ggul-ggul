package com.ggul.application.equipment.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface EquipmentRepository extends JpaRepository<Equipment, UUID> {
    @Query("""
           SELECT e
           FROM Equipment e
           WHERE e.transactionHash = :transactionHash
           """)
    Optional<Equipment> findByTransactionHash(@Param("transactionHash") String transactionHash);
}
