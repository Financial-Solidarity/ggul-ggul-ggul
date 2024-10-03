package com.ggul.application.game.exception;

import com.ggul.application.common.exception.CustomException;

public class GameNotFoundException extends CustomException {
    public GameNotFoundException() {
        super(GameExceptionConstants.GAME_NOT_FOUND);
    }
}