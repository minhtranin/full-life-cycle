
-- author MinhTran
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

-- CREATE TABLE public.crawler (
-- 	title _text NULL,
-- 	description _text NULL,
-- 	link _text NULL,
-- 	"comments" _text NULL,
-- 	pubdate _text NULL,
-- 	category _text NULL,
-- 	hashtable _text NULL
-- );

create table public.crawler (
	id serial primary key,
	title text,
	description text ,
	link text ,
	comments text,
	pubdate text ,
	category text,
	hashtable text
);