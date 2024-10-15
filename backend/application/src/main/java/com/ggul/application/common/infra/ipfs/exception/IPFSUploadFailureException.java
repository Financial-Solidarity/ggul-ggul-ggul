package com.ggul.application.common.infra.ipfs.exception;

public class IPFSUploadFailureException extends RuntimeException {
    public IPFSUploadFailureException(Exception e) {
        super("IPFS upload failure", e);
    }
}
