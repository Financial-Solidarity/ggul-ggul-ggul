package com.ggul.application.account.domain.repository;

import com.ggul.application.account.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {

    @Query("SELECT a.userKey FROM Account a WHERE a.user.id = :userId")
    String findUserKeyByUserId(@Param("userId") UUID userId);
}
