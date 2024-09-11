package com.ggul.application.common.jpa.domain;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CustomUuidGenerator implements IdentifierGenerator {
    public CustomUuidGenerator() {

    }
    @Override
    public Object generate(SharedSessionContractImplementor sharedSessionContractImplementor, Object o) {
        return UUIDGenerator.getUUID();
    }
}
