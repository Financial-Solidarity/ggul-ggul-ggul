package com.ggul.application.chatting.domain;

import jakarta.persistence.AttributeConverter;

public class ChattingRoomTypeConverter implements AttributeConverter<ChattingRoomType, String> {

    @Override
    public String convertToDatabaseColumn(ChattingRoomType attribute) {
        return attribute.getType().getValue().toString();
    }

    @Override
    public ChattingRoomType convertToEntityAttribute(String dbData) {
        return ChattingRoomType.valueOf(dbData);
    }
}
