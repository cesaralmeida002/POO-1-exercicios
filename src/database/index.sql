-- Active: 1675082519348@@127.0.0.1@3306
CREATE TABLE videos(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    duracao_em_segundos TEXT NOT NULL, 
    data_upload TEXT NOT NULL
);

SELECT * FROM videos;

DROP TABLE videos