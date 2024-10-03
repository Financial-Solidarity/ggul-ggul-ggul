package com.ggul.application.equipment.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenizedEquipmentRepository extends JpaRepository<TokenizedEquipment, UUID> {

    @Query("""
           SELECT t
           FROM TokenizedEquipment t
           JOIN FETCH t.equipment e
           JOIN FETCH e.item
           WHERE t.owner.id = :userId AND t.status = :status
           """)
    Optional<TokenizedEquipment> findByUserIdAndStatusUsingFetchAll(UUID userId, Status status);

    @Query("""
           SELECT t
           FROM TokenizedEquipment t
           JOIN FETCH t.equipment e
           JOIN FETCH e.item
           WHERE t.owner.id = :userId AND t.equipment.power BETWEEN :minPower AND :maxPower
           """)
    List<TokenizedEquipment> findByUserIdAndEquipmentPowerBetweenUsingFetchAll(UUID userId, Long minPower, Long maxPower);

    Optional<TokenizedEquipment> findByIpfsCID(String ipfsCID);
    @Query("""
           SELECT t
           FROM TokenizedEquipment t
           WHERE t.owner.id = :userId AND t.status = :status
           """)
    Optional<TokenizedEquipment> findByUserIdAndStatus(UUID userId, Status status);
}
