--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: country; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.country (
    code character varying(3) NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.country OWNER TO root;

--
-- Name: field; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.field (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.field OWNER TO root;

--
-- Name: field_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.field_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.field_id_seq OWNER TO root;

--
-- Name: field_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.field_id_seq OWNED BY public.field.id;


--
-- Name: journal; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.journal (
    issn character varying(9) NOT NULL,
    title text NOT NULL,
    publisher_country_code character varying(3) NOT NULL
);


ALTER TABLE public.journal OWNER TO root;

--
-- Name: journal_field; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.journal_field (
    journal_issn character varying(9) NOT NULL,
    field_id integer NOT NULL
);


ALTER TABLE public.journal_field OWNER TO root;

--
-- Name: method; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.method (
    name text NOT NULL,
    formula text NOT NULL
);


ALTER TABLE public.method OWNER TO root;

--
-- Name: result; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.result (
    country_code character varying(3) NOT NULL,
    field_id integer NOT NULL,
    method_name text NOT NULL,
    value real NOT NULL
);


ALTER TABLE public.result OWNER TO root;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.field ALTER COLUMN id SET DEFAULT nextval('public.field_id_seq'::regclass);


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.country (code, name) FROM stdin;
CZ	CZ
\.


--
-- Data for Name: field; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.field (id, name) FROM stdin;
1	Biology
2	Technology
\.


--
-- Name: field_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.field_id_seq', 2, true);


--
-- Data for Name: journal; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.journal (issn, title, publisher_country_code) FROM stdin;
123	Nature	CZ
\.


--
-- Data for Name: journal_field; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.journal_field (journal_issn, field_id) FROM stdin;
123	1
123	2
\.


--
-- Data for Name: method; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.method (name, formula) FROM stdin;
euclid
cosine
\.


--
-- Data for Name: result; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.result (country_code, field_id, method_name, value) FROM stdin;
CZ	1	cosine	1.23399997
\.


--
-- Name: country_code; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_code PRIMARY KEY (code);


--
-- Name: field_id; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.field
    ADD CONSTRAINT field_id PRIMARY KEY (id);


--
-- Name: journal_issn; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.journal
    ADD CONSTRAINT journal_issn PRIMARY KEY (issn);


--
-- Name: methods_name; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.method
    ADD CONSTRAINT methods_name PRIMARY KEY (name);


--
-- Name: journal_field_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.journal_field
    ADD CONSTRAINT journal_field_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.field(id);


--
-- Name: journal_field_journal_issn_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.journal_field
    ADD CONSTRAINT journal_field_journal_issn_fkey FOREIGN KEY (journal_issn) REFERENCES public.journal(issn);


--
-- Name: journal_publisher_country_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.journal
    ADD CONSTRAINT journal_publisher_country_code_fkey FOREIGN KEY (publisher_country_code) REFERENCES public.country(code);


--
-- Name: result_country_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT result_country_code_fkey FOREIGN KEY (country_code) REFERENCES public.country(code);


--
-- Name: result_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT result_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.field(id);


--
-- Name: result_method_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.result
    ADD CONSTRAINT result_method_name_fkey FOREIGN KEY (method_name) REFERENCES public.method(name);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: root
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM root;
GRANT ALL ON SCHEMA public TO root;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

