--makes new table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name TEXT,
    complete BOOLEAN
	);

--populates with dummy data
INSERT INTO "tasks" ("name", "complete") VALUES ('fix car', 'f');
INSERT INTO "tasks" ("name", "complete") VALUES ('buy new car', 't');
INSERT INTO "tasks" ("name", "complete") VALUES ('fix cat', 'f');
INSERT INTO "tasks" ("name", "complete") VALUES ('buy new cat', 't');
INSERT INTO "tasks" ("name", "complete") VALUES ('do a little dance', 'f');
INSERT INTO "tasks" ("name", "complete") VALUES ('make a little love', 't');
INSERT INTO "tasks" ("name", "complete") VALUES ('get down tonight', 'f');
