package com.ggul.application.chatting.domain;

import lombok.Getter;

import java.util.EnumSet;

@Getter
public class ChattingRoomType {
    private Type type;

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
