package com.ggul.application.wallet.domain;

import com.ggul.application.common.infra.blockchain.converter.ByteArrayToHexStringConverter;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "wallet")
@Entity
public class Wallet {
    @Id
    @GeneratedValue
    @Column(name = "wallet_id")
    @UUIDv7
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "wallet_address")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String address;

    @Column(name = "wallet_private_key")
    @Convert(converter = ByteArrayToHexStringConverter.class)
    private String privateKey;
}
