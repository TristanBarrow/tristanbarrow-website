DROP TABLE users;

CREATE TABLE users(
    id serial primary key,
    username VARCHAR(225)
);

INSERT INTO users(username)
VALUES ('bob');