CREATE TABLE workouts(
    id SERIAL PRIMARY KEY,
    workout_type VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    description VARCHAR(1023) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    user_id INT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);