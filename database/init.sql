DROP TABLE users_bookmarks;
DROP TABLE users;
DROP TABLE session;
DROP TABLE bookmarks;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(225) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE bookmarks(
  id SERIAL PRIMARY KEY,
  bookmark VARCHAR(225) NOT NULL,
  UNIQUE ("bookmark")
);

CREATE TABLE users_bookmarks(
  id SERIAL PRIMARY KEY,
  "user" int REFERENCES users(id) NOT NULL,
  bookmark int REFERENCES bookmarks(id) NOT NULL,
  UNIQUE ("user", "bookmark")
);

-- INSERT INTO users(username, password)
-- VALUES ('Tristan', 'CoolThings');

INSERT INTO bookmarks(bookmark) VALUES ('mark');



CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
