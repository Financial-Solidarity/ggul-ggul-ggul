package com.ggul.application.challange.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class ChallengeParticipantTypeConverter implements AttributeConverter<ChallengeParticipantType, String> {
    @Override
    public String convertToDatabaseColumn(ChallengeParticipantType attribute) {
        return attribute.getType().getValue().toString();
    }

    @Override
    public ChallengeParticipantType convertToEntityAttribute(String dbData) {
        return ChallengeParticipantType.valueOf(dbData);
    }
}
