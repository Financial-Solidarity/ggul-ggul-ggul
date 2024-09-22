package com.ggul.application.chatting.domain;

import lombok.Getter;

import java.util.EnumSet;

@Getter
public class ChattingRoomType {
    private final Type type;

    public static final ChattingRoomType RED = new ChattingRoomType(Type.RED);
    public static final ChattingRoomType BLUE = new ChattingRoomType(Type.BLUE);
    public static final ChattingRoomType TOTAL = new ChattingRoomType(Type.TOTAL);
    public static final ChattingRoomType LOBBY = new ChattingRoomType(Type.LOBBY);

    public enum Type {
        RED('R'), BLUE('B'), TOTAL('T'), LOBBY('L'),
        ;

        private final Character value;
        Type(Character value) {
            this.value = value;
        }

        public Character getValue() {
            return value;
        }
    }

    public ChattingRoomType(Type type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChattingRoomType that = (ChattingRoomType) o;
        return type == that.type;
    }


    public static ChattingRoomType valueOf(String value) {
        EnumSet<ChattingRoomType.Type> set = EnumSet.allOf(ChattingRoomType.Type.class);
        for (ChattingRoomType.Type type : set) {
            if (type.getValue().equals(value.charAt(0))) {
                return new ChattingRoomType(type);
            }
        }

        throw new IllegalArgumentException("Invalid chatting room type: " + value);
    }
}
