DROP TABLE IF EXISTS wallet;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id BINARY(16) NOT NULL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE ,
    user_password BINARY(60) NOT NULL,
    user_nickname VARCHAR(40) NOT NULL UNIQUE,
    user_profile VARCHAR(200),
    created_at DATETIME NOT NULL,
    is_deleted BOOLEAN NOT NULL default false
);

CREATE TABLE wallet (
    wallet_id BINARY(16) NOT NULL PRIMARY KEY,
    user_id BINARY(16) NOT NULL,
    wallet_address BINARY(20) NOT NULL,
    wallet_private_key BINARY(32) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at) VALUES (1, 'khj745700@naver.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), '흑염룡', null, now());

INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key)
VALUES (
       1,
       1,
       UNHEX('0dd888d6fde82d0aeea7b26f304df411d751e7b1'),
        UNHEX('fc12a1c6a64113dd9c762b59982bfe01244c63552e3374d668e5854bb7f437ae')
       );