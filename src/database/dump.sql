--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    name text NOT NULL,
    link text NOT NULL,
    score integer NOT NULL
);


--
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;


--
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.songs VALUES (1, 'Bullet and a target', 'https://www.youtube.com/watch?v=OMy8lKG6Atc', 16);
INSERT INTO public.songs VALUES (3, 'Também quero', 'https://www.youtube.com/watch?v=q3HXAFYtQYU', 8);
INSERT INTO public.songs VALUES (4, 'Poesia acustica 10', 'https://www.youtube.com/watch?v=KAhADAUje9g', 11);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.songs_id_seq', 4, true);


--
-- Name: songs songs_link_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_link_key UNIQUE (link);


--
-- Name: songs songs_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_name_key UNIQUE (name);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

