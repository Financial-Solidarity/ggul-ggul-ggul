package com.ggul.application.challange.domain;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompetitionType {
    private Type type;

    public enum Type {
        TEAM("T"), SOLO("S");

        private final String value;
        Type(String value) { this.value = value; }

        public String getValue() { return value; }
    }

    public CompetitionType(Type type) {
        this.type = type;
    }

    public static CompetitionType of(String type) {
        if("T".equalsIgnoreCase(type)) {
            return new CompetitionType(Type.TEAM);
        }

        if("S".equalsIgnoreCase(type)) {
            return new CompetitionType(Type.SOLO);
        }

        throw new IllegalArgumentException("경쟁타입이 일치하지 않습니다.");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompetitionType that = (CompetitionType) o;
        return type.equals(that.type);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(type.hashCode());
    }
}
