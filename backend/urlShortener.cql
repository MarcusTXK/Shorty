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
    role text,
);