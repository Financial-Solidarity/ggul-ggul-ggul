DROP TABLE IF EXISTS wallet;
DROP TABLE IF EXISTS chatting;
DROP TABLE IF EXISTS chatting_room_participant;
DROP TABLE IF EXISTS chatting_room;
DROP TABLE IF EXISTS challenge_participant;
DROP TABLE IF EXISTS challenge;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS fcm_token;
DROP TABLE IF EXISTS consumption_log;
DROP TABLE IF EXISTS ggul_log;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    user_id       BINARY(16)  NOT NULL PRIMARY KEY,
    username      VARCHAR(40) NOT NULL UNIQUE,
    user_password BINARY(60)  NOT NULL,
    user_nickname VARCHAR(40) NOT NULL UNIQUE,
    user_profile  VARCHAR(200),
    created_at    DATETIME    NOT NULL,
    is_deleted    BOOLEAN     NOT NULL default false
);

CREATE TABLE wallet
(
    wallet_id          BINARY(16) NOT NULL PRIMARY KEY,
    user_id            BINARY(16) NOT NULL,
    wallet_address     BINARY(20) NOT NULL,
    wallet_private_key BINARY(32) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

CREATE TABLE fcm_token
(
    fcm_token_id          INTEGER      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fcm_token             VARCHAR(255) NOT NULL,
    user_id               BINARY(16)   NOT NULL,
    session_id            BINARY(16),
    web_socket_session_id BINARY(16),
    is_foreground         BOOL         NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE challenge
(
    challenge_id                BINARY(16)  NOT NULL PRIMARY KEY,
    challenge_title             VARCHAR(40) NOT NULL,
    challenge_password_exist    BOOL        NOT NULL,
    challenge_password          BINARY(60)  NOT NULL,
    challenge_owner_id          BINARY(16)  NOT NULL,
    challenge_is_blindness      BOOL        NOT NULL,
    challenge_limit_participant TINYINT     NOT NULL,
    challenge_competition_type  CHAR(1)     NOT NULL,
    challenge_budget_cap        INT         NOT NULL,
    challenge_is_ready          BOOL        NOT NULL,
    challenge_is_ended          BOOL        NOT NULL,
    challenge_started_at        DATETIME,
    challenge_ended_at          DATETIME,
    created_at                  DATETIME    NOT NULL,
    is_deleted                  Boolean     NOT NULL DEFAULT FALSE,
    FOREIGN KEY (challenge_owner_id) REFERENCES user (user_id)
);


CREATE TABLE challenge_participant
(
    challenge_participant_id   BINARY(16)  NOT NULL PRIMARY KEY,
    challenge_id               BINARY(16)  NOT NULL,
    user_id                    BINARY(16)  NOT NULL,
    nickname                   VARCHAR(20) NOT NULL,
    profile                    VARCHAR(200),
    challenge_participant_type CHAR(1)     NOT NULL,
    participated_at            DATETIME    NOT NULL,
    is_deleted                 BOOL        NOT NULL,
    FOREIGN KEY (challenge_id) REFERENCES challenge (challenge_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE chatting_room
(
    chatting_room_id   BINARY(16) NOT NULL PRIMARY KEY,
    challenge_id       BINARY(16) NOT NULL,
    chatting_room_type CHAR(1)    NOT NULL,
    FOREIGN KEY (challenge_id) REFERENCES challenge (challenge_id)
);

CREATE TABLE chatting_room_participant
(
    chatting_room_participant_id BINARY(16) NOT NULL PRIMARY KEY,
    chatting_room_id             BINARY(16) NOT NULL,
    challenge_participant_id     BINARY(16) NOT NULL,
    last_connected_at            DATETIME   NOT NULL,
    FOREIGN KEY (chatting_room_id) REFERENCES chatting_room (chatting_room_id),
    FOREIGN KEY (challenge_participant_id) REFERENCES challenge_participant (challenge_participant_id)
);

CREATE TABLE notification
(
    notification_id    BINARY(16)   NOT NULL PRIMARY KEY,
    notification_title VARCHAR(80)  NOT NULL,
    notification_body  VARCHAR(150) NOT NULL,
    user_id            BINARY(16)   NOT NULL,
    notification_type  VARCHAR(40)  NOT NULL,
    data               JSON,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);


CREATE TABLE category
(
    product_category_id INT         NOT NULL,
    category_name       VARCHAR(40) NOT NULL
);


CREATE TABLE ggul_log
(
    ggul_log_id BINARY(16) NOT NULL PRIMARY KEY,
    user_id     BINARY(16) NOT NULL,
    ggul_num    INTEGER    NOT NULL,
    created_at  DATETIME   NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);


CREATE TABLE consumption_log
(
    consumption_log_id  BINARY(16)  NOT NULL PRIMARY KEY,
    user_id             BINARY(16)  NOT NULL,
    product_category_id INT         NOT NULL,
    consumption_at      DATETIME    NOT NULL,
    consumption_balance INT         NOT NULL,
    product_name        VARCHAR(40) NOT NULL,
    consumption_market  VARCHAR(50) NOT NULL,
    ggul_log_id         BINARY(16),
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (ggul_log_id) REFERENCES ggul_log (ggul_log_id)
);

CREATE TABLE chatting
(
    chatting_id               BINARY(16) PRIMARY KEY NOT NULL,
    challenge_participant_id  BINARY(16)             NOT NULL,
    chatting_room_id          BINARY(16)             NOT NULL,
    type                      CHAR(1)                NOT NULL,
    chatting_content          TEXT,
    consumption_category_name VARCHAR(40),
    consumption_balance       INTEGER,
    FOREIGN KEY (challenge_participant_id) REFERENCES challenge_participant(challenge_participant_id),
    FOREIGN KEY (chatting_room_id) REFERENCES chatting_room(chatting_room_id)
);

INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at)
VALUES (1, 'khj745700@naver.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), '흑염룡',
        null, now());

INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key)
VALUES (1,
        1,
        UNHEX('0dd888d6fde82d0aeea7b26f304df411d751e7b1'),
        UNHEX('fc12a1c6a64113dd9c762b59982bfe01244c63552e3374d668e5854bb7f437ae'));
INSERT INTO challenge (challenge_id, challenge_title, challenge_password_exist, challenge_password, challenge_owner_id,
                       challenge_is_blindness, challenge_limit_participant, challenge_budget_cap, challenge_is_ready,
                       challenge_is_ended, challenge_started_at, challenge_ended_at, challenge_competition_type,
                       created_at)
VALUES (1, '테스트1', true, CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), 1, false, 3, 3,
        false, false, NOW() + INTERVAL (30) SECOND, NOW() + INTERVAL (2) MINUTE, 'T', NOW());
