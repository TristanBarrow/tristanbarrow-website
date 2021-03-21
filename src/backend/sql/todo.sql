    -- id: number
    -- name: string
    -- description: string
    -- is_finished: boolean
    -- is_deleted: boolean
    -- user_id: number

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1023) NOT NULL,
    is_finished BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    user_id INT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);