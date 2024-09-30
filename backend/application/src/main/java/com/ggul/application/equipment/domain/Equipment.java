package com.ggul.application.equipment.domain;

import com.ggul.application.common.infra.blockchain.converter.ByteArrayToHexStringConverter;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.equipment.exception.EquipmentAlreadyMintedException;
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
public class Equipment {
    @Id
    @GeneratedValue
    @Column(name = "equipment_id")
    @UUIDv7
    private UUID id;

    @Column(name = "power")
    private Long power;

    @JoinColumn(name = "item_id")
    @OneToOne(fetch = FetchType.LAZY)
    private EquipmentItem item;

    @Column(name = "publisher")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String publisher;

    @Column(name = "adjective")
    private String adjective;

    @Column(name = "transaction_hash")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String transactionHash;

    @Column(name = "minted")
    private Boolean minted;

    @PrePersist
    private void prePersist() {
        minted = false;
    }

    public void runMint(){
        if(minted)
            throw new EquipmentAlreadyMintedException();
        minted = true;
    }
}
