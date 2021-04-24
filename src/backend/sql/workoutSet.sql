CREATE TABLE workoutSets(
    id SERIAL PRIMARY KEY,
    workout INTEGER NOT NULL,
    exercise INTEGER NOT NULL,
    order INTEGER NOT NULL,
    resistance INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    side VARCHAR(255) NOT NULL,
    notes VARCHAR(4095),
    is_deleted BOOLEAN DEFAULT FALSE,
    user_id INT,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
);