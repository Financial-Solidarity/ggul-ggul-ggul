package com.ggul.application.common.jpa.domain;

import com.github.f4b6a3.uuid.UuidCreator;

import java.util.UUID;

public class UUIDGenerator {

    public static UUID getUUID() {
        return UuidCreator.getTimeOrderedEpoch();
    }
}
