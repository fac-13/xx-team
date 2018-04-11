BEGIN;

DROP TABLE IF EXISTS users, reviews CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX email_unique_idx ON users (email);

CREATE INDEX email_password_idx ON users (email, encrypted_password);

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id BIGINT REFERENCES users(id) NOT NULL,
  comment VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;