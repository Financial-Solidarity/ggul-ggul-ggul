package com.ggul.application.challange.domain;

import lombok.Getter;

import java.util.EnumSet;

@Getter
public class ChallengeParticipantType {
    private final Type type;

    public static final ChallengeParticipantType RED = new ChallengeParticipantType(Type.RED);
    public static final ChallengeParticipantType BLUE = new ChallengeParticipantType(Type.BLUE);
    public static final ChallengeParticipantType PERSONAL = new ChallengeParticipantType(Type.PERSONAL);

    public enum Type {
        RED('R'), BLUE('B'), PERSONAL('P');

        private final Character value;

        Type(Character value) {
            this.value = value;
        }

        public Character getValue() {
            return value;
        }
    }

    public ChallengeParticipantType(Type type) {
        this.type = type;
    }


    public static ChallengeParticipantType valueOf(String value) {
        EnumSet<Type> set = EnumSet.allOf(ChallengeParticipantType.Type.class);
        for (ChallengeParticipantType.Type type : set) {
            if (type.getValue().equals(value.charAt(0))) {
                return new ChallengeParticipantType(type);
            }
        }

        throw new IllegalArgumentException("Invalid challenge participant type: " + value);
    }
}
