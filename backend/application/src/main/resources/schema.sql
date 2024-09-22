DROP TABLE IF EXISTS challenge;
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

CREATE TABLE challenge (
    challenge_room_id BINARY(16) NOT NULL PRIMARY KEY,
    challenge_title VARCHAR(40) NOT NULL,
    challenge_password_exist BOOL NOT NULL,
    challenge_password BINARY(60) NOT NULL,
    challenge_owner_id BINARY(16) NOT NULL,
    challenge_is_blindness BOOL NOT NULL,
    challenge_limit_participant TINYINT NOT NULL,
    challenge_budget_cap INT NOT NULL,
    challenge_is_started BOOL NOT NULL,
    challenge_is_ended BOOL NOT NULL,
    challenge_started_at DATETIME,
    challenge_ended_at DATETIME,
    FOREIGN KEY (challenge_owner_id) REFERENCES user(user_id)
);

INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at) VALUES (1, 'khj745700@naver.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), '흑염룡', null, now());

