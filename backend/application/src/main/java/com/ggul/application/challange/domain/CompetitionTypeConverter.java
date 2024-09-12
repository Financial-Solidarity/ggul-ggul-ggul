package com.ggul.application.challange.domain;

import jakarta.persistence.AttributeConverter;

public class CompetitionTypeConverter implements AttributeConverter<CompetitionType, String> {
    @Override
    public String convertToDatabaseColumn(CompetitionType attribute) {
        return attribute.getType().getValue();
    }

    @Override
    public CompetitionType convertToEntityAttribute(String dbData) {
        return CompetitionType.of(dbData);
    }
}
