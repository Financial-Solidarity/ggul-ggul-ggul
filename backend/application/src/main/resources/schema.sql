DROP TABLE IF EXISTS primary_account;
DROP TABLE IF EXISTS challenge_log;
DROP TABLE IF EXISTS consumption_log;
DROP TABLE IF EXISTS ggul_log;
DROP TABLE IF EXISTS application_history;
DROP TABLE IF EXISTS application;
DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS market_deal;
DROP TABLE IF EXISTS market;
DROP TABLE IF EXISTS tokenized_equipment;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS equipment_item;
DROP TABLE IF EXISTS wallet;
DROP TABLE IF EXISTS chatting;
DROP TABLE IF EXISTS chatting_room_participant;
DROP TABLE IF EXISTS chatting_room;
DROP TABLE IF EXISTS challenge_participant;
DROP TABLE IF EXISTS challenge;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS fcm_token;
DROP TABLE IF EXISTS wallet_history;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS bank_book;
DROP TABLE IF EXISTS blind_nickname;

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
    challenge_id                BINARY(16)   NOT NULL PRIMARY KEY,
    challenge_title             VARCHAR(120) NOT NULL,
    challenge_password_exist    BOOL         NOT NULL,
    challenge_password          BINARY(60),
    challenge_owner_id          BINARY(16)   NOT NULL,
    challenge_is_blindness      BOOL         NOT NULL,
    challenge_limit_participant TINYINT      NOT NULL,
    challenge_competition_type  CHAR(1)      NOT NULL,
    challenge_budget_cap        INT          NOT NULL,
    challenge_is_ready          BOOL         NOT NULL,
    challenge_is_ended          BOOL         NOT NULL,
    challenge_started_at        DATETIME,
    challenge_ended_at          DATETIME,
    created_at                  DATETIME     NOT NULL,
    is_deleted                  Boolean      NOT NULL DEFAULT FALSE,
    FOREIGN KEY (challenge_owner_id) REFERENCES user (user_id)
);


CREATE TABLE challenge_participant
(
    challenge_participant_id   BINARY(16)  NOT NULL PRIMARY KEY,
    challenge_id               BINARY(16)  NOT NULL,
    user_id                    BINARY(16)  NOT NULL,
    nickname                   VARCHAR(60) NOT NULL,
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
    created_at         DATETIME   NOT NULL,
    FOREIGN KEY (challenge_id) REFERENCES challenge (challenge_id)
);

CREATE TABLE chatting_room_participant
(
    chatting_room_participant_id BINARY(16) NOT NULL PRIMARY KEY,
    chatting_room_id             BINARY(16) NOT NULL,
    challenge_participant_id     BINARY(16) NOT NULL,
    last_connected_at            DATETIME   NOT NULL,
    created_at                   DATETIME   NOT NULL,
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
    created_at         DATETIME     NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);


CREATE TABLE category
(
    product_category_id INT         NOT NULL PRIMARY KEY,
    category_name       VARCHAR(40) NOT NULL
);

CREATE TABLE equipment_item
(
    equipment_item_id BIGINT       NOT NULL PRIMARY KEY,
    name              VARCHAR(40)  NOT NULL,
    url               VARCHAR(200) NOT NULL
);

CREATE TABLE equipment
(
    equipment_id     BINARY(16)  NOT NULL PRIMARY KEY,
    power            VARCHAR(40) NOT NULL,
    item_id          BIGINT      NOT NULL,
    publisher        BINARY(20)  NOT NULL,
    adjective        VARCHAR(40) NOT NULL,
    transaction_hash BINARY(32)  NOT NULL,
    minted           BOOL        NOT NULL,
    FOREIGN KEY (item_id) REFERENCES equipment_item (equipment_item_id)
);

CREATE TABLE tokenized_equipment
(
    tokenized_equipment_id BINARY(16)   NOT NULL PRIMARY KEY,
    ipfs_cid               VARCHAR(60)  NOT NULL,
    nft_url                VARCHAR(200) NOT NULL,
    status                 VARCHAR(16)  NOT NULL,
    owner_id               BINARY(16)   NOT NULL,
    equipment_id           BINARY(16)   NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES user (user_id),
    FOREIGN KEY (equipment_id) REFERENCES equipment (equipment_id)
);

CREATE TABLE market
(
    market_id              BINARY(16)   NOT NULL PRIMARY KEY,
    tokenized_equipment_id BINARY(16)   NOT NULL,
    seller_id              BINARY(16)   NOT NULL,
    buyer_id               BINARY(16)   NULL,
    title                  VARCHAR(40)  NOT NULL,
    description            VARCHAR(200) NULL,
    price                  BIGINT       NOT NULL,
    created_at             DATETIME     NOT NULL,
    completed_at           DATETIME     NULL,
    status                 VARCHAR(16)  NOT NULL,

    FOREIGN KEY (tokenized_equipment_id) REFERENCES tokenized_equipment (tokenized_equipment_id),
    FOREIGN KEY (seller_id) REFERENCES user (user_id),
    FOREIGN KEY (buyer_id) REFERENCES user (user_id)
);

CREATE TABLE market_deal
(
    market_deal_id BINARY(16) NOT NULL PRIMARY KEY,
    market_id      BINARY(16) NOT NULL,
    deal_no        BIGINT     NOT NULL,

    FOREIGN KEY (market_id) REFERENCES market (market_id)
);

CREATE TABLE wallet_history
(
    wallet_history_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id           BINARY(16)  NOT NULL,
    quantity          BIGINT      NOT NULL,
    category          VARCHAR(32) NOT NULL,
    created_at        DATETIME    NOT NULL,
    is_positive       BOOL        NOT NULL,
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
    wallet_history_id   BIGINT,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (product_category_id) REFERENCES category (product_category_id),
    FOREIGN KEY (wallet_history_id) REFERENCES wallet_history (wallet_history_id)
);

CREATE TABLE chatting
(
    chatting_id               BINARY(16) PRIMARY KEY NOT NULL,
    challenge_participant_id  BINARY(16)             NOT NULL,
    chatting_room_id          BINARY(16)             NOT NULL,
    type                      TINYINT                NOT NULL,
    chatting_content          TEXT,
    consumption_category_name VARCHAR(40),
    consumption_balance       INTEGER,
    created_at                DATETIME               NOT NULL,
    FOREIGN KEY (challenge_participant_id) REFERENCES challenge_participant (challenge_participant_id),
    FOREIGN KEY (chatting_room_id) REFERENCES chatting_room (chatting_room_id)
);

CREATE TABLE account
(
    account_id       BINARY(16) PRIMARY KEY NOT NULL,
    user_id          BINARY(16)             NOT NULL,
    account_user_key VARCHAR(40)            NOT NULL
);

CREATE TABLE bank_book
(
    bank_book_id   BINARY(16) PRIMARY KEY NOT NULL,
    user_id        BINARY(16)             NOT NULL,
    account_number VARCHAR(40)            NOT NULL
);

CREATE TABLE game
(
    user_id          BINARY(16) PRIMARY KEY NOT NULL,
    last_received_at DATETIME               NOT NULL
);

CREATE TABLE application
(
    application_id   BIGINT PRIMARY KEY NOT NULL,
    title            VARCHAR(40),
    image_url        VARCHAR(200),
    probability      DOUBLE,
    price            BIGINT,
    max_winner_count BIGINT,
    status           VARCHAR(16),
    created_at       DATETIME
);

CREATE TABLE application_history
(
    application_history_id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id                BINARY(16),
    application_id         BIGINT,
    transaction_hash       VARCHAR(200),
    is_success             BOOL,
    nonce                  BIGINT,
    created_at             DATETIME,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (application_id) REFERENCES application (application_id)
);
CREATE TABLE primary_account
(
    account_id BINARY(16) PRIMARY KEY NOT NULL,
    user_id    BINARY(16)             NOT NULL,
    account_no VARCHAR(40)            NOT NULL
);

CREATE TABLE challenge_log
(
    challenge_log_id         BINARY(16) PRIMARY KEY NOT NULL,
    challenge_participant_id BINARY(16)             NOT NULL,
    challenge_id             BINARY(16)             NOT NULL,
    is_success               BOOL                   NOT NULL,
    is_lose                  BOOL,
    ggul_num                 INT                    NOT NULL,
    created_at               DATETIME               NOT NULL,
    FOREIGN KEY (challenge_participant_id) REFERENCES challenge_participant (challenge_participant_id),
    FOREIGN KEY (challenge_id) REFERENCES challenge (challenge_id)
);

CREATE TABLE blind_nickname
(
    blind_nickname_id TINYINT     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    blind_nickname    VARCHAR(60) NOT NULL
);

INSERT INTO blind_nickname (blind_nickname)
VALUES ('통장 바닥남'),
       ('잔고없지'),
       ('거지왕 김거지'),
       ('땅파서 돈나옴?'),
       ('라면빌런'),
       ('구멍난 주머니'),
       ('희망없는 통장요정'),
       ('알바만렙'),
       ('돈없지'),
       ('동전줍는 마법사'),
       ('오늘도 거지런'),
       ('흙수저킹'),
       ('구독자 0원'),
       ('월세파이터'),
       ('식비탐험가'),
       ('신용카드 전설'),
       ('월급은 신기루'),
       ('구멍난 양말맨'),
       ('현금없는 인생'),
       ('짠돌이 마스터'),
       ('통장에 눈물'),
       ('파산만큼은'),
       ('월급 루팡'),
       ('희망없는 잔고'),
       ('빚쟁이왕'),
       ('사라진 월급날'),
       ('닫힌 지갑'),
       ('적자왕'),
       ('알바력 만렙'),
       ('희망회로 오작동');


INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at)
VALUES (1, 'khj745700@naver.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        '흑염룡1', null, now()),
       (2, 'test1@test.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), '흑염룡2',
        null, now()),
       (3, 'test2@test.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), '흑염룡3',
        null, now()),
       (4, 'test3@test.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), '흑염룡4',
        null, now()),
       (5, 'test4@test.com', CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), '흑염룡5',
        null, now()),
       (6, "tester999@naver.com", CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        '흑염룡6', null, now()),
       (7, "tester998@naver.com", CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        '흑염룡7', null, now()),
       (8, "tester997@naver.com", CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        '흑염룡8', null, now()),
       (9, "tester996@naver.com", CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        'ggul996', null, now()),
       (10, "tester995@naver.com", CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        'ggul995', null, now()),
       (11, "tester994@naver.com", CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY),
        'ggul994', null, now())
;

INSERT INTO challenge (challenge_id, challenge_title, challenge_password_exist, challenge_password, challenge_owner_id,
                       challenge_is_blindness, challenge_limit_participant, challenge_budget_cap, challenge_is_ready,
                       challenge_is_ended, challenge_started_at, challenge_ended_at, challenge_competition_type,
                       created_at)
VALUES (1, '테스트1', true, CAST('$2a$10$yTQYJz8F/gkR2sEPQkmrT.6CKZXRI1ZvFUa1BtRuQa7cArWyn77T2' AS BINARY), 1, false, 3, 3,
        true, false, NOW() + INTERVAL (30) SECOND, NOW() + INTERVAL (15) SECOND, 'T', NOW());

INSERT INTO challenge_participant(challenge_participant_id, challenge_id, user_id, nickname, profile,
                                  challenge_participant_type, participated_at, is_deleted)
VALUES (1, 1, 6, '흑염룡6', null, 'R', NOW(), 0),
       (2, 1, 7, '흑염룡7', null, 'B', NOW(), 0);

INSERT INTO chatting_room(chatting_room_id, challenge_id, chatting_room_type, created_at)
VALUES (1, 1, 'L', NOW()),
       (2, 1, 'R', NOW()),
       (3, 1, 'B', NOW());

INSERT INTO chatting_room_participant(chatting_room_participant_id, chatting_room_id, challenge_participant_id,
                                      last_connected_at, created_at)
VALUES (1, 1, 1, NOW(), NOW()),
       (2, 1, 2, NOW(), NOW()),
       (3, 2, 1, NOW(), NOW()),
       (4, 3, 2, NOW(), NOW());

INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key)
VALUES (1, 1, UNHEX('0dd888d6fde82d0aeea7b26f304df411d751e7b1'),
        UNHEX('fc12a1c6a64113dd9c762b59982bfe01244c63552e3374d668e5854bb7f437ae')),
       (2, 2, UNHEX('def2d27fe78B9723Af7378a5f190893A8a86878d'),
        UNHEX('22f58e78aefd7b57ead64b9e206279eb8d19e7bd3198a96f4f4c26e6f58f8ae7')),
       (3, 3, UNHEX('54AA43dD565B534c9952372871332E41830a8Fbc'),
        UNHEX('f133db6b508a6e8a76cf2ac3cb3556df24be4e91f17d3803cedafa23ac6a0a72')),
       (4, 4, UNHEX('AF2d34A747823716662fBF31778eC82B3db2CD43'),
        UNHEX('60710f8d624666d905577e17e7d66c4fce0c9f732be22982b1669e70467fda9c')),
       (5, 5, UNHEX('E881422ff52a70eeCff60e0b8326dfA2c91eB6d4'),
        UNHEX('54aabd91d8061a671364d7ce7fa350253550a8e97cd39c1a42b8cf3ac22aa494')),
       (6, 6, UNHEX('445405085629c13c4d160ef067C82c5d2361d34a'),
        UNHEX('f2f6da67bd25974e8315c57e7f1e536dada711aa3e7ccead9658d34045f5cc8e')),
       (7, 7, UNHEX('f4BE70e403A272c60A03428C3C5af94214765A58'),
        UNHEX('94e85d3a3cc24698cdd82220a7d500de480dad57d224495c9f714335efab413b')),
       (8, 8, UNHEX('08Be144B4085c2b5a129BD2BD7D36a5C01eEEEC5'),
        UNHEX('83de8dd28f55a351a5aaf7b9ed673be44bb7908a424cffc35440a5ce546f37d6')),
       (9, 9, UNHEX('DDEa5932a9e1868348eF65bAfF02359bB07Cd1B5'),
        UNHEX('9184740247669d119441a9a70ac085e5889ea037b1c28eb22ea60cb55beb7d9f')),
       (10, 10, UNHEX('c43373Ed0b30C169659C118B46ac71Cb777a072B'),
        UNHEX('0d183b52768047f2de41fbdb23e85edf4a130fa0e1a3ea90282d40c910fbc327')),
       (11, 11, UNHEX('E7Fc869fBBa9b12AC09090E51533a2E828CAE351'),
        UNHEX('b857408d5d3a71572e8e2e49737fbbff64b468ee882c8da11447d9b8ff5b5958'));


insert into account(account_id, user_id, account_user_key)
values (1, 6, 'ff883feb-b587-40f7-b41e-394743b1e435'),
       (2, 7, '88aa6007-a3f3-4858-9bfe-7c836002b744'),
       (3, 8, '51ac880b-f01e-41aa-9d4d-640bb197de7a'),
       (4, 9, '29ba45ce-ca35-4372-bc03-f0e3c9c15708'),
       (5, 10, '57bfe0b7-7003-46f8-a300-61ab8c5d7617'),
       (6, 11, '0589c79d-c5de-4cf1-96da-d87d57417962');

INSERT INTO equipment_item (equipment_item_id, name, url)
VALUES (1, "컵케익", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/cupcake.png"),
       (2, "당고", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/dango.png"),
       (3, "개밥", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/dogfood.png"),
       (4, "도넛", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/donut.png"),
       (5, "김밥", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/gimbap.png"),
       (6, "햄버거", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/hamburger.png"),
       (7, "핫도그", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/hotdog.png"),
       (8, "고기", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/meat.png"),
       (9, "오믈렛", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/omelet.png"),
       (10, "피자", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/pizza.png"),
       (11, "라멘", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/ramen.png"),
       (12, "샐러드", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/salad.png"),
       (13, "회", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/sashimi.png"),
       (14, "꼬치", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/skewer.png"),
       (15, "초밥", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/sushi.png"),
       (16, "타코", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/taco.png"),
       (17, "덴푸라", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/tempora.png"),
       (18, "토스트", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/toast.png"),
       (19, "두부", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/tofu.png"),
       (20, "참치캔", "https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/images/foods/tunacan.png");


INSERT INTO category (product_category_id, category_name)
VALUES (1, '배달 음식');
