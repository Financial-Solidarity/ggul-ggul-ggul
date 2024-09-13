package com.ggul.application.user.application;

import java.util.Random;

final class GenerateRandomNumber {

    private static final Random random = new Random();

    public static String getStr(int size) {
        StringBuilder str = new StringBuilder();
        for(int i = 0; i < size; i++) {
            str.append(random.nextInt(10));
        }
        return str.toString();
    }

    public static Integer getInt(int size) {
        return Integer.parseInt(getStr(size));
    }
}
