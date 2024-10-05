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
@Table(name = "primary_account")
@Builder
public class PrimaryAccount {
    @Id
    @GeneratedValue
    @Column(name = "account_id")
    @UUIDv7
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "account_no")
    private String accountNo;


    public void updateAccountNo(String accountNo){
        this.accountNo = accountNo;
    }
}
