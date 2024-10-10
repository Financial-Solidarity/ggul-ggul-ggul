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

INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x01926FEBEF557714A773EBA3163C5078, 'kehegi6775@adambra.com', 0x243261243130244174306C61557862357A4162304435723269706E764F5765444779556B754144514C58456D6E6B756D764F7846416F4A3134654453, 'rrrggg', null, '2024-10-09 15:16:26', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x019271802EF071C18DE9953A5E2EDECA, 'ggul987654321@gmail.com', 0x243261243130246F78664F536D6953476E4F56765A4C3366714E492F2E6E377956327848514A712E614B77645049626864752E4434484D764C6E3547, 'test1tes', 'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/user%2Fprofile%2F01927474-6e4a-76c6-b7c8-7b3b6da406f6blob', '2024-10-09 22:37:59', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x0192726FF2ED7D3291EFF7F40DE1AC7A, 'gentry_@naver.com', 0x243261243130246452376868585074624565386C796861675275795975394D736465744C376272374B726C424958656B35777667733737396F415875, 'test1test', null, '2024-10-10 02:59:52', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x31000000000000000000000000000000, 'khj745700@naver.com', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, '흑염룡1', null, '2024-10-09 02:22:30', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x31300000000000000000000000000000, 'tester995@naver.com', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'ggul995', 'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/user%2Fprofile%2F0192743d-cfce-78a5-ab50-cbe8ded18816svg', '2024-10-09 02:22:30', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x31310000000000000000000000000000, 'tester994@naver.com', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'ggul994', null, '2024-10-09 02:22:30', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x31320000000000000000000000000000, 'tester990@naver.com', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, '시연자', 'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/user%2Fprofile%2F0192743c-b7cc-764d-b9ff-89e9ebadce2ejfif', '2024-10-09 21:06:46', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x31340000000000000000000000000000, 'tester9999@naver.com', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, '시연자 테스트', null, '2024-10-09 21:23:13', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x31350000000000000000000000000000, 'tester99999@naver.com', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, '찐 시연자', 'https://solsolhighasset.s3.ap-northeast-2.amazonaws.com/user%2Fprofile%2F0192743d-0e2d-7363-8b9f-0250e4895be7png', '2024-10-09 22:13:06', 0);
INSERT INTO user (user_id, username, user_password, user_nickname, user_profile, created_at, is_deleted) VALUES (0x32000000000000000000000000000000, 'test1@test.com', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, '흑염룡2', null, '2024-10-09 02:22:30', 0);



INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x01926FEBF02E7F2EA985447F00D013D5, 0x01926FEBEF557714A773EBA3163C5078, 0x5BE639B041E7FB28C1A21C762546CB1EBE7ED200, 0xDEB3AED293C8E15D7549FD7A5AD3CC02706E4E96740AB26EC371F0A272E89A00);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x019271802FC57F1DA3F95ED009D523AD, 0x019271802EF071C18DE9953A5E2EDECA, 0x62D5CC2B13EC9F8AC6D65FC25162D678F8737D00, 0x69304AD104C414792A6CE0508E067FB9538100564D6292EB11EF64189A43D200);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x0192726FF3BE791E8ADFE100DCD6BC63, 0x0192726FF2ED7D3291EFF7F40DE1AC7A, 0xE6DD67D83A876EE3B8F6A50B653140C899137F00, 0x46A071F7BEA183DEFE874D25DF43A5BE6810BE47F27A842ECF5B33D75C97BE00);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x31000000000000000000000000000000, 0x31000000000000000000000000000000, 0x0DD888D6FDE82D0AEEA7B26F304DF411D751E7B1, 0xFC12A1C6A64113DD9C762B59982BFE01244C63552E3374D668E5854BB7F437AE);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x31300000000000000000000000000000, 0x31300000000000000000000000000000, 0xC43373ED0B30C169659C118B46AC71CB777A072B, 0x0D183B52768047F2DE41FBDB23E85EDF4A130FA0E1A3EA90282D40C910FBC327);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x31310000000000000000000000000000, 0x31310000000000000000000000000000, 0xE7FC869FBBA9B12AC09090E51533A2E828CAE351, 0xB857408D5D3A71572E8E2E49737FBBFF64B468EE882C8DA11447D9B8FF5B5958);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x31320000000000000000000000000000, 0x31320000000000000000000000000000, 0x742846872E106B0304843ED0205C4E2617A0CED9, 0x32BD32227444B9DD93B9ABD7E62B2979E4D159CA78A5A5CA3BD23149989820E9);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x31330000000000000000000000000000, 0x31340000000000000000000000000000, 0x2B9EAB8862D7F8C9908E657C6DC60A783189CD88, 0x3908C13FC92DA67E40E76C5BF788013274692ABE169EA44830801FDD5924D575);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x31340000000000000000000000000000, 0x31350000000000000000000000000000, 0x27367FB2A495E30B45C0F8742EAF4CDE7A07215C, 0x4DEBA8938B115499203D82701A6E044AE3A4E5AC216BF9362647EBA09432DD89);
INSERT INTO wallet (wallet_id, user_id, wallet_address, wallet_private_key) VALUES (0x32000000000000000000000000000000, 0x32000000000000000000000000000000, 0xDEF2D27FE78B9723AF7378A5F190893A8A86878D, 0x22F58E78AEFD7B57EAD64B9E206279EB8D19E7BD3198A96F4F4C26E6F58F8AE7);

INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x01926FEBF1727DE087A3FCD4B9733630, 0x01926FEBEF557714A773EBA3163C5078, '76aab457-a12c-4e2a-b119-364016c9ac76');
INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x019271306C1D7E6B8C1EFC4CC8E97D6D, 0x31320000000000000000000000000000, '4b87036c-2af7-4bc8-ae92-95c369e1c093');
INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x0192713C8D92793EB1A1187CDFE6AF89, 0x31340000000000000000000000000000, 'd57ee315-b545-4650-ad1c-0d6c3a9945d6');
INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x0192716C508D74C4A7BB252B6D5A8C7C, 0x31350000000000000000000000000000, 'a40907a5-24ac-4a43-adf8-e2323ecfbb0d');
INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x01927180312C7A53BAF0960D9038AEB0, 0x019271802EF071C18DE9953A5E2EDECA, 'b3aaf951-2732-45f6-a7dc-f5caad823812');
INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x0192726FF6E572CE94CF995EB40BDA50, 0x0192726FF2ED7D3291EFF7F40DE1AC7A, '3b765ca5-41e4-4d25-b66f-7daa282828b1');
INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x31000000000000000000000000000000, 0x36000000000000000000000000000000, 'ff883feb-b587-40f7-b41e-394743b1e435');
INSERT INTO account (account_id, user_id, account_user_key) VALUES (0x32000000000000000000000000000000, 0x37000000000000000000000000000000, '88aa6007-a3f3-4858-9bfe-7c836002b744');


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
VALUES
    (1, '배달'),
    (2, '카페/디저트'),
    (3, '술/유흥'),
    (4, '문화/여가'),
    (5, '교통'),
    (6, '패션/쇼핑'),
    (7, '뷰티'),
    (8, '마트');
