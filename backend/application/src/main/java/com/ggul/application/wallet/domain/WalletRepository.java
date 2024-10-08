package com.ggul.application.wallet.domain;

import com.ggul.application.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface WalletRepository extends JpaRepository<Wallet, UUID> {
    Optional<Wallet> findByUserId(UUID userId);
    Optional<Wallet> findByUser(User user);
}
