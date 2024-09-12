DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id BINARY(16) NOT NULL PRIMARY KEY,
    username VARCHAR(40) NOT NULL UNIQUE ,
    user_password BINARY(60) NOT NULL,
    user_nickname VARCHAR(40) NOT NULL UNIQUE,
    user_profile VARCHAR(200) NOT NULL
);
