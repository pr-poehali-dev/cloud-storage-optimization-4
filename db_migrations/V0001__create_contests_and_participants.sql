CREATE TABLE contests (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  city TEXT,
  held_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  surname TEXT NOT NULL,
  name TEXT NOT NULL,
  patronymic TEXT,
  city TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE participant_contests (
  id SERIAL PRIMARY KEY,
  participant_id INTEGER REFERENCES participants(id),
  contest_id INTEGER REFERENCES contests(id),
  place TEXT,
  score NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);
