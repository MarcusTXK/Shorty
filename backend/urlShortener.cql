DROP KEYSPACE IF EXISTS urlshortener;

CREATE KEYSPACE urlshortener WITH replication = {
    'class': 'SimpleStrategy', 
    'replication_factor': '1' 
};

USE urlshortener;

CREATE TABLE url (
    short_url text PRIMARY KEY, 
    original_url text, 
    password text, 
    email text
);

CREATE TABLE user (
    email text PRIMARY KEY,
    password text,
    role text,
);

insert into user (email, password, role) values ('free@email.com', '$2b$10$eYQvY4.AMq6MsP59m4x2cOHh302LaF7idCBRah4Z0IM7dpWjD8Jvi', 'FREE');
insert into user (email, password, role) values ('premium@email.com', '$2b$10$eYQvY4.AMq6MsP59m4x2cOHh302LaF7idCBRah4Z0IM7dpWjD8Jvi', 'PREMIUM');