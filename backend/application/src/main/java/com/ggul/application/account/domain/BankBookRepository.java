package com.ggul.application.account.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BankBookRepository extends JpaRepository<BankBook, UUID> {
}
