package com.ggul.application.ggul.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GgulLogRepository extends JpaRepository<GgulLog, UUID> {
}
