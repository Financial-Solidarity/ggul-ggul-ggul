package com.ggul.application.wallet.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface WalletHistoryRepository extends JpaRepository<WalletHistory, Long> {

    @Query("""
           SELECT wh
           FROM WalletHistory wh
           WHERE wh.user.id = :userId
           ORDER BY wh.createdAt DESC
           """)
    Slice<WalletHistory> findByUserId(@Param("userId") UUID userId, Pageable pageable);
}
