package com.ggul.application.equipment.exception;

public class NFTOwnerAlreadyExistsException extends Exception {
  public NFTOwnerAlreadyExistsException(Exception e) {
    super("An owner for this NFT already exists", e);
  }
}
