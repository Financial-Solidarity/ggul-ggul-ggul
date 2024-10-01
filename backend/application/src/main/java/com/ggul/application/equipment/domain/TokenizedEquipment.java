package com.ggul.application.equipment.domain;

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
@Table(name = "tokenized_equipment")
@Entity
public class TokenizedEquipment {
    @Id
    @GeneratedValue
    @Column(name = "tokenized_equipment_id")
    @UUIDv7
    private UUID id;

    @Column(name = "ipfs_cid")
    private String ipfsCID;

    @Column(name = "nft_url")
    private String nftUrl;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @JoinColumn(name = "owner_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User owner;

    @JoinColumn(name = "equipment_id")
    @OneToOne(fetch = FetchType.LAZY)
    private Equipment equipment;

    public void changeOwner(User user){
        this.owner = user;
    }

    public void changeStatus(Status status){
        this.status = status;
    }
}