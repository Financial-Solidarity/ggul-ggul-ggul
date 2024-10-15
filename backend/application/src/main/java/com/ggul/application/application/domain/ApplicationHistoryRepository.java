package com.ggul.application.application.domain;

import com.ggul.application.user.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ApplicationHistoryRepository extends JpaRepository<ApplicationHistory, Long>, ApplicationCustomRepository {
    boolean existsByApplicationAndUserAndIsSuccess(Application application, User user, Boolean isSuccess);

    @Query("""
           SELECT ah
           FROM ApplicationHistory ah
           JOIN FETCH ah.application
           WHERE ah.user.id = :userId
           ORDER BY ah.createdAt DESC
           """)
    Slice<ApplicationHistory> findByUserId(UUID userId, Pageable pageable);
}
