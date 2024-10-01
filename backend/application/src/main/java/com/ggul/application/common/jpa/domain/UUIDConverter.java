package com.ggul.application.common.jpa.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.UUID;

@Converter
public class UUIDConverter implements AttributeConverter<String, UUID> {
    @Override
    public UUID convertToDatabaseColumn(String string) {
        return UUID.fromString(string);
    }

    @Override
    public String convertToEntityAttribute(UUID uuid) {
        return uuid.toString();
    }

}
