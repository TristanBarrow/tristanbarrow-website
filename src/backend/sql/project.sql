CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    sub_title VARCHAR(1023) NOT NULL,
    description TEXT NOT NULL,
    link VARCHAR(255) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    user_id INT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);