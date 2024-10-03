package com.ggul.application.account.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

public interface BankBookRepository extends JpaRepository<BankBook, UUID> {

    @Modifying
    @Transactional
    @Query("DELETE FROM BankBook b WHERE b.user.id = :userId")
    void deleteAllMyAccount(@Param("userId") UUID userId);

}
