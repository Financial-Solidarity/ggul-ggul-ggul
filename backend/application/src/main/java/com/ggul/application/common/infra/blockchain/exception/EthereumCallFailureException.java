package com.ggul.application.common.infra.blockchain.exception;

public class EthereumCallFailureException extends RuntimeException {
  public EthereumCallFailureException(Exception e) {
      super("Ethereum call Failed", e);
  }
}
