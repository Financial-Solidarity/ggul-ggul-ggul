package com.ggul.application.account.domain;

import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bank_book")
@Builder
public class BankBook {
    @Id
    @GeneratedValue
    @Column(name = "bank_book_id")
    @UUIDv7
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "account_number")
    private String accountNumber;
}
