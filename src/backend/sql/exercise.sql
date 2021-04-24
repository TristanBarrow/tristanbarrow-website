CREATE TABLE exercises(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(4095) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    user_id INT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);