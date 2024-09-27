package com.ggul.application.wallet.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.HexFormat;

@Converter
public class ByteArrayToStringConverter implements AttributeConverter<String, byte[]> {

    @Override
    public String convertToEntityAttribute(byte[] bytes) {
        return bytes == null ? null : HexFormat.of().formatHex(bytes);
    }

    @Override
    public byte[] convertToDatabaseColumn(String s) {
        return s == null ? null : HexFormat.of().parseHex(s);
    }
}
