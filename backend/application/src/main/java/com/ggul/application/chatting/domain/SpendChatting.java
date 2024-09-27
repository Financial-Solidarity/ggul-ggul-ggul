package com.ggul.application.chatting.domain;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("s")
@Table(name = "chatting_spend")
@Entity
public class SpendChatting extends Chatting {
    @Column(name = "chatting_content")
    private String content;

    @Override
    public Type getType() {
        return Type.SPEND;
    }
}
