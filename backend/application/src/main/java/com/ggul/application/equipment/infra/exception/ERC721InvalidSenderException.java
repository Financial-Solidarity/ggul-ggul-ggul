package com.ggul.application.equipment.infra.exception;

public class ERC721InvalidSenderException extends RuntimeException{
    public ERC721InvalidSenderException(Exception e) {
        super(e);
    }
}
