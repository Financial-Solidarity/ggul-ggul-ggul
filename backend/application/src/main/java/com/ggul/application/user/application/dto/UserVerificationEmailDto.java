package com.ggul.application.user.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserVerificationEmailDto implements Serializable {
    private static final long serialVersionUID = -2003632380209941855L;
    private String email;
    private String verificationNumber;
    private boolean isValid;

    public boolean verify(EmailVerificationRequest request) {
        isValid = this.verificationNumber.equals(request.getNumber()) && email.equals(request.getEmail());
        return isValid;
    }

    public boolean canUse() {
        return isValid;
    }

    public String getEmail() {
        return email;
    }
}
