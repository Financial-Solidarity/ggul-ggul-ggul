package com.ggul.application.user.domain;

import com.ggul.application.common.domain.password.Password;
import com.ggul.application.common.domain.password.PasswordConverter;
import com.ggul.application.common.jpa.domain.SoftDeleteEntity;
import com.ggul.application.common.jpa.domain.UUIDv7;
import com.ggul.application.fcmtoken.domain.FcmToken;
import com.ggul.application.user.application.dto.UserInfoModifyRequest;
import com.ggul.application.user.exception.PasswordNotMatchException;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.UUID;

@SuperBuilder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
@Entity
public class User extends SoftDeleteEntity {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    @UUIDv7
    private UUID id;

    @Column
    private String username;

    @Column(name = "user_nickname")
    private String nickname;

    @Convert(converter = PasswordConverter.class)
    @Column(name = "user_password")
    private Password password;

    @Column(name = "user_profile")
    private String profile;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<FcmToken> fcmTokens;

    public void update(UserInfoModifyRequest request, String imageUrl) {
        if(request.getNickname() != null && !request.getNickname().isEmpty()) {
            nickname = request.getNickname();
        }

        if(request.getNowPassword() != null && !request.getNowPassword().isEmpty()) {
            if(!password.equals(Password.of(request.getNowPassword(), false))) {
                throw new PasswordNotMatchException();
            }

            if(request.getNewPassword() != null && !request.getNewPassword().isEmpty()) {
                this.password = Password.of(request.getNewPassword(), false);
            }
        }

        if(request.getIsProfileImgRemove()) {
            this.profile = null;
        }

        if(imageUrl != null) {
            this.profile = imageUrl;
        }
    }

//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//
//    }
}
