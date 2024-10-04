package com.ggul.application.account.domain.repository;

import com.ggul.application.account.domain.PrimaryAccount;
import com.ggul.application.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface PrimaryAccountRepository extends JpaRepository<PrimaryAccount, UUID> {

    PrimaryAccount findByUser_id(UUID userId);
}
