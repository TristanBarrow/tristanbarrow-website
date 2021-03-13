DROP TABLE personal_info CASCADE;
DROP TABLE users CASCADE;
DROP TABLE session CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(225) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE personal_info(
  id SERIAL PRIMARY KEY,
  user_id INT,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  link VARCHAR(255),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(id)
);

INSERT INTO personal_info(label, value, link)
VALUES 
('Phone', '(425) 420-8903', NULL),
('Email', 'tristanmarkbarrow@gmail.com', NULL),
('GitHub', 'www.github.com/TristanBarrow', 'https://github.com/TristanBarrow'),
('LinkedIn', 'www.linkedin.com/in/tristanmbarrow', 'https://www.linkedin.com/in/tristanmbarrow/');


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
