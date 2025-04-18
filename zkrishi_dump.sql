--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: LabourType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LabourType" AS ENUM (
    'FIELD_LABOUR',
    'LIVESTOCK_WORKER',
    'EQUIPMENT_OPERATOR',
    'IRRIGATION_TECHNICIAN',
    'HARVEST_WORKER',
    'SUPERVISOR',
    'FARM_GUARD'
);


ALTER TYPE public."LabourType" OWNER TO postgres;

--
-- Name: ProductType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProductType" AS ENUM (
    'CROP',
    'FERTILIZER',
    'UTILS',
    'SEED'
);


ALTER TYPE public."ProductType" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: VoteType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."VoteType" AS ENUM (
    'UPVOTE',
    'DOWNVOTE'
);


ALTER TYPE public."VoteType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _JobPostToLabour; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_JobPostToLabour" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_JobPostToLabour" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id text NOT NULL,
    "answerContent" text NOT NULL,
    "userId" text NOT NULL,
    "communityPostId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blogs (
    id text NOT NULL,
    "blogTitle" text NOT NULL,
    "blogContent" text NOT NULL,
    "blogImage" text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.blogs OWNER TO postgres;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id text NOT NULL,
    "cartId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: community_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.community_posts (
    id text NOT NULL,
    "postTitle" text NOT NULL,
    "postDescription" text NOT NULL,
    "userId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "postImage" text NOT NULL
);


ALTER TABLE public.community_posts OWNER TO postgres;

--
-- Name: diseases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.diseases (
    id text NOT NULL,
    "diseaseName" text NOT NULL,
    "diseaseDescription" text NOT NULL,
    cure text NOT NULL,
    prevention text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.diseases OWNER TO postgres;

--
-- Name: job_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.job_posts (
    id text NOT NULL,
    "jobTitle" text NOT NULL,
    "jobDescription" text NOT NULL,
    "labourCount" integer NOT NULL,
    "applyCount" integer NOT NULL,
    location text NOT NULL,
    wage integer NOT NULL,
    "workHours" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.job_posts OWNER TO postgres;

--
-- Name: labors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.labors (
    id text NOT NULL,
    location text NOT NULL,
    "wageDemand" integer NOT NULL,
    "labourType" public."LabourType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public.labors OWNER TO postgres;

--
-- Name: managements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.managements (
    id text NOT NULL,
    "cropTitle" text NOT NULL,
    "plantingDate" timestamp(3) without time zone NOT NULL,
    "expectedHarvDate" timestamp(3) without time zone NOT NULL,
    "irrigationInterval" integer NOT NULL,
    "lastIrrigation" timestamp(3) without time zone NOT NULL,
    "lastPesticide" timestamp(3) without time zone NOT NULL,
    "waterAmount" integer NOT NULL,
    "pesticidesUsed" text NOT NULL,
    disease text NOT NULL,
    "actionTaken" boolean NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public.managements OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id text NOT NULL,
    "productName" text NOT NULL,
    "productType" public."ProductType" NOT NULL,
    "productDescription" text NOT NULL,
    "productImage" text NOT NULL,
    "productPrice" integer NOT NULL,
    "productRating" double precision DEFAULT 0.00 NOT NULL,
    "totalSold" integer DEFAULT 0 NOT NULL,
    "productRemaining" integer NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    password text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "isSeller" boolean DEFAULT false NOT NULL,
    "isLabour" boolean DEFAULT false NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: verification_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification_tokens (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.verification_tokens OWNER TO postgres;

--
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    id text NOT NULL,
    "userId" text NOT NULL,
    "answerId" text,
    type public."VoteType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "communityPostId" text
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- Data for Name: _JobPostToLabour; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_JobPostToLabour" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
962284ce-abb4-4770-ab83-2cac36ce2781	86f322779f2c96c3cff3a1690a8565648fee66781071569f9b0c95457d3eded9	2024-11-06 13:05:47.642998+06	20241106070547_cart_added	\N	\N	2024-11-06 13:05:47.545231+06	1
4a7e9604-7447-4caf-9383-8144481fabce	fdd8087050576c397475c25896cd959ee495214f588c1cdad92fa2b739a177c1	2024-11-06 22:43:34.847272+06	20241106164334_add_post_image	\N	\N	2024-11-06 22:43:34.84233+06	1
93d264c6-69db-41c9-b55e-2268c364b711	5e3c8bdcd92c2d77220536e75dfebf6e9a0f85eb90836374b0ee4a849d7285aa	2024-11-07 03:04:35.448563+06	20241106210435_added_vote_table	\N	\N	2024-11-07 03:04:35.424493+06	1
bb0ef2ab-9ee2-4e27-bd8c-c0f63dae5fd1	46ea680fea4431b56ac4bc42db548eb2515f9e79dcdc8f2a7ad296aa2e35059d	2024-11-07 03:42:49.577786+06	20241106214249_fixpost_id	\N	\N	2024-11-07 03:42:49.569735+06	1
e53ae738-0910-4cca-8f39-919a20276abb	572af5734a716371f56d1c0b4277043d094328d013c99728af4cb2239bdf6fe6	2024-11-07 16:17:24.951994+06	20241107101724_fix_disease_table	\N	\N	2024-11-07 16:17:24.947549+06	1
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
cm3w28izp00005ofce6t51irt	oidc	google	114055946816895348585	1//0gVjZ_aznpVNiCgYIARAAGBASNwF-L9IrLBuNrCKAvZN2sjXfEVs5gAv_wb8T9hkrCslcyg-ywZoODFaV3I-7R8B1N3sBjW5IOfk	ya29.a0AeDClZBf5_OIYPuJIfMnsVT70wP0LpnCqXEanMeEdnNal_Sj80w6EO5U9YR1uPsbNwzscnPEClXEFvZeax9d2CyKZ0IvQRXQQ1beYo_I0t6re6N8N5YobxhYNAaUb-5ZLXcShRzKc53ddZTMbYg1i-n1fbdP1SMdJSW8zx3EaCgYKARcSARESFQHGX2MijIPSaOB3yrFa6LqjzJ5Obg0175	1732484230	bearer	openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email	eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NzQwYTcwYjA5NzJkY2NmNzVmYTg4YmM1MjliZDE2YTMwNTczYmQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NjM3MjgzNTEyNTQtcDVyOG84c3RkcWdrb3R0ODBlaDlpMDV1MDVyczJpaXYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NjM3MjgzNTEyNTQtcDVyOG84c3RkcWdrb3R0ODBlaDlpMDV1MDVyczJpaXYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTQwNTU5NDY4MTY4OTUzNDg1ODUiLCJlbWFpbCI6ImFhZ2FsaWIyMzIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoibE9CZC03XzFhZng3SDVYcW9NVW95USIsIm5hbWUiOiJBc2FkdWxsYWggQWwgZ2FsaWIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSk83TUNjTFpIZ3VqT1EzSDlUNEFScUFDYnd3M25SYVNnOU1qTXMwamM3eEN0MHFKTGM9czk2LWMiLCJnaXZlbl9uYW1lIjoiQXNhZHVsbGFoIEFsIiwiZmFtaWx5X25hbWUiOiJnYWxpYiIsImlhdCI6MTczMjQ4MDYzMCwiZXhwIjoxNzMyNDg0MjMwfQ.WzorspfpIhWh7TZcUSCw-bv9XPHbWUpAFVQB3IdaoS20MraCoid2X3FhWI9KhxTr2xfr3xr9g69iUZE6-8vLU1nBEyt3P7bfPYW1hBcM4Kq9CJuan6LiJFGUkN0ERlWht26PD-hKfCpTt5HTdz8N7-cZk1R1IOlZKWe36_Q9W90BISeEHDsdaoLYyZf-rWO-LHaVeUMpSa3xjvdfmkWAwQNtb8VCWimrh3DzDW06TDsLdiNR6FjoKhlGPH1Ukwep16772CRqZ15iOlPfl5_2rbZtkwoHnrsleEn-OdYBeBwUgWciMbQybeDjpEtSUy-vizaZgGpZeRX4bmoXhk-ncA	\N	2024-11-24 20:37:11.857	2024-11-24 20:37:11.857
\.


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (id, "answerContent", "userId", "communityPostId", "createdAt", "updatedAt") FROM stdin;
cm38e17ld000312qgoceiaeeg	Brown patches on wheat are often caused by fungal diseases such as *Septoria tritici* blotch or *Tan spot*. To manage these diseases, start by using resistant wheat varieties and rotating crops to reduce pathogen carryover in the soil. Fungicides can be applied preventatively, particularly during wet conditions that promote fungal growth. Ensure proper spacing between plants to improve airflow and reduce moisture, which discourages fungal proliferation. Maintaining balanced soil nutrition, especially with potassium and nitrogen, can also strengthen plant resistance to infections.	cm388gtm400004w9sc3i7ey13	cm38dyruq000112qg7kxom4gc	2024-11-08 07:00:57.649	2024-11-08 07:00:57.649
cm38e1hfy000512qgv10kg1u4	Contact a farm expert	cm388gtm400004w9sc3i7ey13	cm38dyruq000112qg7kxom4gc	2024-11-08 07:01:10.414	2024-11-08 07:01:10.414
cm3y3pzy40001bkaiinw1zuqj	test 	cm3w28izp00005ofce6t51irt	cm38e3g2q000712qgww33fu48	2024-11-26 06:54:18.938	2024-11-26 06:54:18.938
cm3y40j5t0005bkaiks7pgklj	ask a spcialist	cm3w28izp00005ofce6t51irt	cm38e3g2q000712qgww33fu48	2024-11-26 07:02:30.4	2024-11-26 07:02:30.4
cm70lpe5l0005mtmqqi3egjy0	asdf	cm3w28izp00005ofce6t51irt	cm38dyruq000112qg7kxom4gc	2025-02-11 14:52:23.145	2025-02-11 14:52:23.145
\.


--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blogs (id, "blogTitle", "blogContent", "blogImage", "userId", "createdAt", "updatedAt") FROM stdin;
cm3x5b2ir000113kqvr96y74d	Key things to consider for modern farming	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima eius, dicta nobis maiores facilis excepturi at tempora vero maxime pariatur, sunt quasi velit explicabo non distinctio ducimus aspernatur ea hic corporis! Maiores necessitatibus ratione, aliquid voluptate non maxime libero labore numquam esse accusamus, eius, accusantium ut officiis vel quos distinctio quo voluptatem? Provident, saepe, blanditiis accusamus quas, natus quisquam vitae dolor hic aspernatur illo at sed necessitatibus corrupti quis voluptatem! Hic dignissimos quis iure reprehenderit, repudiandae perferendis, nam consequuntur atque sunt culpa doloremque illum expedita perspiciatis illo necessitatibus dolores blanditiis consequatur, voluptatum aliquam mollitia unde cumque. Hic impedit magni excepturi.	https://utfs.io/f/6BZs4rT8PViQxkXf1ENAWXGzTY5IylO37ZinKUptSc6VauNJ	cm3w28izp00005ofce6t51irt	2024-11-25 14:50:55.346	2024-11-25 14:50:55.346
cm3x6fc4x000313kqs750u0nw	Harvesting rules for more production	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima eius, dicta nobis maiores facilis excepturi at tempora vero maxime pariatur, sunt quasi velit explicabo non distinctio ducimus aspernatur ea hic corporis! Maiores necessitatibus ratione, aliquid voluptate non maxime libero labore numquam esse accusamus, eius, accusantium ut officiis vel quos distinctio quo voluptatem? Provident, saepe, blanditiis accusamus quas, natus quisquam vitae dolor hic aspernatur illo at sed necessitatibus corrupti quis voluptatem! Hic dignissimos quis iure reprehenderit, repudiandae perferendis, nam consequuntur atque sunt culpa doloremque illum expedita perspiciatis illo necessitatibus dolores blanditiis consequatur, voluptatum aliquam mollitia unde cumque. Hic impedit magni excepturi.	https://utfs.io/f/6BZs4rT8PViQr63c8YNvzJVkA1UwTd458MDxYCsEyfI7Qtjv	cm3w28izp00005ofce6t51irt	2024-11-25 15:22:14.193	2024-11-25 15:22:14.193
cm3x6h1rf000513kqjvc8s9pg	Be cautious while using pesticides	Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima eius, dicta nobis maiores facilis excepturi at tempora vero maxime pariatur, sunt quasi velit explicabo non distinctio ducimus aspernatur ea hic corporis! Maiores necessitatibus ratione, aliquid voluptate non maxime libero labore numquam esse accusamus, eius, accusantium ut officiis vel quos distinctio quo voluptatem? Provident, saepe, blanditiis accusamus quas, natus quisquam vitae dolor hic aspernatur illo at sed necessitatibus corrupti quis voluptatem! Hic dignissimos quis iure reprehenderit, repudiandae perferendis, nam consequuntur atque sunt culpa doloremque illum expedita perspiciatis illo necessitatibus dolores blanditiis consequatur, voluptatum aliquam mollitia unde cumque. Hic impedit magni excepturi.	https://utfs.io/f/6BZs4rT8PViQc8rbvF3V1E9Sm3jKnTNC0OUWtMAzvXoe7wQZ	cm3w28izp00005ofce6t51irt	2024-11-25 15:23:34.059	2024-11-25 15:23:34.059
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, "cartId", "productId", quantity, "createdAt", "updatedAt") FROM stdin;
cm3mwc9xx00033kjtlkelykv3	cm38jm9dv000r12qgrilmsa58	cm38jlu9q000p12qgfvgtqohz	2	2024-11-18 10:42:13.462	2024-11-18 10:42:13.462
cm70lofyz0003mtmqbovd8l6t	cm70lofyz0001mtmqfwwefidd	cm38j8lf7000d12qg2fw8vo6u	1	2025-02-11 14:51:38.842	2025-02-11 14:51:38.842
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, "userId", "createdAt", "updatedAt") FROM stdin;
cm35vvshd000dm7thldvodspm	cm35jpdln0001141iaxz72c1p	2024-11-06 12:57:19.345	2024-11-06 12:57:19.345
cm38jm9dv000r12qgrilmsa58	cm388gtm400004w9sc3i7ey13	2024-11-08 09:37:17.827	2024-11-08 09:37:17.827
cm70lofyz0001mtmqfwwefidd	cm3w28izp00005ofce6t51irt	2025-02-11 14:51:38.842	2025-02-11 14:51:38.842
\.


--
-- Data for Name: community_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.community_posts (id, "postTitle", "postDescription", "userId", "createdAt", "updatedAt", "postImage") FROM stdin;
cm38dyruq000112qg7kxom4gc	Wait! What are these rusty things on my maize ?	Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, perferendis odit ipsam modi, dignissimos, asperiores nam ad labore nobis eos fuga incidunt deleniti sunt. Molestiae autem pariatur natus obcaecati ratione animi laboriosam excepturi, recusandae dolorem, ipsam cupiditate deleniti? Magni modi optio nihil quisquam est fugiat non veniam, dolorem ad. Similique!	cm388gtm400004w9sc3i7ey13	2024-11-08 06:59:03.909	2024-11-08 06:59:03.909	https://utfs.io/f/6BZs4rT8PViQNacwQBO7rtcCOVvg4BseDlFzS2L9AHnwyua6
cm38e3g2q000712qgww33fu48	Why the leaves are wilted ?? What is happening guys ?	Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores nemo obcaecati, minus molestias officia totam quos enim, ut non maiores at, repellendus aliquam! Voluptas iste quasi, voluptatem in quae dignissimos, dolorum a incidunt possimus dolorem neque asperiores deserunt amet molestias fuga, nostrum esse atque. Eveniet ab vero accusamus reprehenderit! Autem	cm388gtm400004w9sc3i7ey13	2024-11-08 07:02:41.954	2024-11-08 07:02:41.954	https://utfs.io/f/6BZs4rT8PViQQANeB4D0PnsUo6Bg4fXlWJYKbzM3hLaqmcvx
\.


--
-- Data for Name: diseases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.diseases (id, "diseaseName", "diseaseDescription", cure, prevention, "createdAt", "updatedAt") FROM stdin;
cm376zlgz000110z9w8nmdpta	anthrancose	Anthracnose, caused by Colletotrichum gloeosporioides, affects mango leaves, stems, flowers, and fruits. It creates dark lesions on mangoes, causing significant yield loss. In humid conditions, these lesions enlarge and rot fruits, reducing marketability and affecting tree health over time.	Apply fungicides, like copper-based sprays, to affected areas and remove infected parts from the tree.	Ensure proper pruning to increase air circulation and reduce humidity around the tree. Spraying with fungicides during early flowering┬áalso┬áhelps.	2024-11-07 10:55:58.835	2024-11-07 10:57:45.727
cm376ymsa000010z9rjqfhyt6	blight	Potato blight, primarily caused by Phytophthora infestans, is a destructive fungal-like disease leading to large brown lesions on leaves and tubers, eventually causing plant death. This disease spreads quickly in warm, moist environments and can devastate entire fields if untreated.	Use copper fungicides and remove infected plants from fields immediately.	Practice crop rotation and space plants to allow airflow, which reduces moisture. Growing blight-resistant potato varieties is┬áalso┬áeffective.	2024-11-07 10:55:13.882	2024-11-07 10:57:58.989
cm377egp0000210z9xms9i5kj	powdery-mildew	Mango powdery mildew, caused by Oidium mangiferae, produces white, powdery spots on leaves, flowers, and fruit. It hinders flowering, leading to reduced yields and affecting fruit quality. Powdery mildew thrives in warm, dry climates with high humidity, making it a recurring issue in mango orchards.	Treat infected parts with sulfur-based fungicides and prune affected areas to reduce spore spread.	Regular fungicide sprays during flowering and keeping the orchard well-pruned to enhance airflow can prevent mildew┬áoutbreaks.	2024-11-07 11:07:32.485	2024-11-07 11:06:57.387
cm377fh4j000310z9nlis3x7d	bacterial-wilt	Bacterial wilt, caused by Ralstonia solanacearum, is a severe disease affecting tomato plants. It causes wilting, stunted growth, and yellowing of leaves. This bacterium enters plants through roots and blocks water transport, leading to a sudden collapse. The disease thrives in warm, humid climates and persists in the soil, making it challenging to control.	Use resistant tomato varieties and improve soil drainage. Soil solarization (covering soil with plastic) can help reduce bacterial populations.	Rotate crops, avoid overwatering, and sterilize tools. Keeping the soil well-drained can help┬áprevent┬áspread.	2024-11-07 11:08:19.699	2024-11-07 11:07:34.21
cm377gahd000410z9qjuoatr8	common-rust	Common rust in corn, caused by Puccinia sorghi, appears as red-brown pustules on leaves, which can reduce photosynthesis and weaken plants. This disease spreads through windborne spores and is particularly common in humid, mild climates. Heavy infestations can lead to stunted growth and reduced crop yields.	Plant rust-resistant corn varieties and apply fungicides if needed, particularly in heavily affected fields.	Use crop rotation and avoid planting corn in previously infected areas. Planting rust-resistant hybrids also helps manage┬áthe┬ádisease.	2024-11-07 11:08:57.746	2024-11-07 11:08:21.34
\.


--
-- Data for Name: job_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.job_posts (id, "jobTitle", "jobDescription", "labourCount", "applyCount", location, wage, "workHours", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: labors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.labors (id, location, "wageDemand", "labourType", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: managements; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.managements (id, "cropTitle", "plantingDate", "expectedHarvDate", "irrigationInterval", "lastIrrigation", "lastPesticide", "waterAmount", "pesticidesUsed", disease, "actionTaken", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, "productName", "productType", "productDescription", "productImage", "productPrice", "productRating", "totalSold", "productRemaining", "userId", "createdAt", "updatedAt") FROM stdin;
cm38jl4hy000n12qgsz4r1018	Tomato seeds	SEED	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi incidunt dolorum illo, ex unde iusto quibusdam quia, ea dolorem odio consequuntur, impedit officiis a dolores sequi alias ducimus perspiciatis quae nisi totam nobis doloribus iste asperiores minima! Rerum, asperiores quidem	https://utfs.io/f/6BZs4rT8PViQDedERP97D0wLjeCzmsYGaVoQcHu31PtpZgEO	23	0	0	38	cm388gtm400004w9sc3i7ey13	2024-11-08 09:36:24.838	2024-11-08 09:37:17.836
cm38jlu9q000p12qgfvgtqohz	Flakes	SEED	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi incidunt dolorum illo, ex unde iusto quibusdam quia, ea dolorem odio consequuntur, impedit officiis a dolores sequi alias ducimus perspiciatis quae nisi totam nobis doloribus iste asperiores minima! Rerum, asperiores quidem	https://utfs.io/f/6BZs4rT8PViQ2jrw6yBpUSPuF56GWzOxib3v4cg8VKITwsfl	34	0	0	48	cm388gtm400004w9sc3i7ey13	2024-11-08 09:36:58.238	2024-11-18 10:42:13.465
cm38ji830000l12qgjbrutoz7	Garden Fork	UTILS	A strong garden fork with four prongs, excellent for aerating soil, turning compost, and loosening hard ground.	https://utfs.io/f/6BZs4rT8PViQa4zJTJCZTjvsmQ83Me9KgLhnSP2cYlf1wzA4	500	0	0	38	cm388gtm400004w9sc3i7ey13	2024-11-08 09:34:09.516	2024-11-24 21:29:34.784
cm38jexnd000h12qgf9e47yr7	Organic Compost	FERTILIZER	Made from organic matter, this compost improves soil structure, enhances water retention, and provides essential nutrients for plant growth. Ideal for organic farming and gardening.	https://utfs.io/f/6BZs4rT8PViQ2XiEwQBpUSPuF56GWzOxib3v4cg8VKITwsfl	450	0	5	50	cm388gtm400004w9sc3i7ey13	2024-11-08 09:31:36.025	2024-11-24 22:02:02.097
cm38jcyv1000f12qgkjdq2lwg	Soybeans	CROP	Rich in protein and essential nutrients, our soybeans are grown organically and are perfect for producing tofu, soy milk, and other soy-based products.	https://utfs.io/f/6BZs4rT8PViQ8DH1E7jn509tLEX1nRdfxmT68Z3blaozBJSV	300	0	0	40	cm388gtm400004w9sc3i7ey13	2024-11-08 09:30:04.285	2024-11-08 09:30:04.285
cm38jh6f7000j12qgpm7ilggu	Shovel	UTILS	A durable, heavy-duty shovel for digging and moving soil, compost, and other materials. Ideal for general garden and farm use.	https://utfs.io/f/6BZs4rT8PViQjOZ6D6xY508tAXrENQC4kW7TqVlFodi9fhbg	150	0	0	12	cm388gtm400004w9sc3i7ey13	2024-11-08 09:33:20.707	2024-11-08 09:33:20.707
cm38j2xem000912qgj2wna46p	Wheat	CROP	A versatile grain, wheat is rich in fiber and proteins, making it a staple in bread, pasta, and numerous other food products. Our wheat is harvested sustainably, ensuring top quality and optimal nutrients.	https://utfs.io/f/6BZs4rT8PViQhbrq5Bp3cdSAvuC1aY90VqgfPGym2NlIQKki	50	0	2	39	cm388gtm400004w9sc3i7ey13	2024-11-08 09:22:15.838	2024-11-25 20:50:14.303
cm38j4fjh000b12qg9va2nqyy	Paddy	CROP	High-quality, long-grain rice that cooks to a fluffy, tender texture, perfect for various dishes. This rice is grown in nutrient-rich fields and minimally processed to retain essential nutrients.	https://utfs.io/f/6BZs4rT8PViQpU1i269ckSwZ2sR5ilUuJzP4x1b6BNhmHgq7	75	0	2	68	cm388gtm400004w9sc3i7ey13	2024-11-08 09:23:25.998	2024-11-24 21:58:39.116
cm38j8lf7000d12qg2fw8vo6u	Crop	CROP	Sweet and delicious corn, great for both fresh consumption and as a base for various corn-based products like cornmeal. ItΓÇÖs non-GMO and harvested at peak maturity to ensure flavor.	https://utfs.io/f/6BZs4rT8PViQaviRNqCZTjvsmQ83Me9KgLhnSP2cYlf1wzA4	60	0	0	29	cm388gtm400004w9sc3i7ey13	2024-11-08 09:26:40.243	2025-02-11 14:51:38.87
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "emailVerified", image, "isSeller", "isLabour", role, "createdAt", "updatedAt") FROM stdin;
cm35jpdln0001141iaxz72c1p	user1	user1@gmail.com	$2a$10$8JuzxZRcc8Nou9xzYKjExepMtZKAiUT4HedEdN5voy6ccBxvly9T.	\N	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png	f	f	USER	2024-11-06 07:16:24.732	2024-11-06 07:16:24.732
cm388gtm400004w9sc3i7ey13	User 4	user4@gmail.com	$2a$10$Sf9R7G9L/pdrDnpeoQGuFugJdhgmQBy31g4I.zifitJbFIg8cz11S	\N	https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png	f	f	USER	2024-11-08 04:25:08.331	2024-11-08 04:25:08.331
cm3w28izp00005ofce6t51irt	Asadullah Al galib	aagalib2323@gmail.com	\N	\N	https://lh3.googleusercontent.com/a/ACg8ocJO7MCcLZHgujOQ3H9T4ARqACbww3nRaSg9MjMs0jc7xCt0qJLc=s96-c	f	f	ADMIN	2024-11-24 20:37:11.845	2024-11-25 20:35:58.345
\.


--
-- Data for Name: verification_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification_tokens (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.votes (id, "userId", "answerId", type, "createdAt", "communityPostId") FROM stdin;
cm3mw7rus00013kjtkx1vx0ml	cm388gtm400004w9sc3i7ey13	\N	UPVOTE	2024-11-18 10:38:43.395	cm38dyruq000112qg7kxom4gc
cm3y406160003bkai6g09lbdp	cm3w28izp00005ofce6t51irt	\N	UPVOTE	2024-11-26 07:02:13.387	cm38e3g2q000712qgww33fu48
cm9d7plep0001q3ro9cpmcvvp	cm3w28izp00005ofce6t51irt	\N	DOWNVOTE	2025-04-11 20:01:02.879	cm38dyruq000112qg7kxom4gc
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (provider, "providerAccountId");


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: community_posts community_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.community_posts
    ADD CONSTRAINT community_posts_pkey PRIMARY KEY (id);


--
-- Name: diseases diseases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.diseases
    ADD CONSTRAINT diseases_pkey PRIMARY KEY (id);


--
-- Name: job_posts job_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.job_posts
    ADD CONSTRAINT job_posts_pkey PRIMARY KEY (id);


--
-- Name: labors labors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labors
    ADD CONSTRAINT labors_pkey PRIMARY KEY (id);


--
-- Name: managements managements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managements
    ADD CONSTRAINT managements_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verification_tokens verification_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_pkey PRIMARY KEY (identifier, token);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: _JobPostToLabour_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_JobPostToLabour_AB_unique" ON public."_JobPostToLabour" USING btree ("A", "B");


--
-- Name: _JobPostToLabour_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_JobPostToLabour_B_index" ON public."_JobPostToLabour" USING btree ("B");


--
-- Name: carts_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "carts_userId_key" ON public.carts USING btree ("userId");


--
-- Name: labors_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "labors_userId_key" ON public.labors USING btree ("userId");


--
-- Name: sessions_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "sessions_sessionToken_key" ON public.sessions USING btree ("sessionToken");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: votes_userId_answerId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "votes_userId_answerId_key" ON public.votes USING btree ("userId", "answerId");


--
-- Name: votes_userId_communityPostId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "votes_userId_communityPostId_key" ON public.votes USING btree ("userId", "communityPostId");


--
-- Name: _JobPostToLabour _JobPostToLabour_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_JobPostToLabour"
    ADD CONSTRAINT "_JobPostToLabour_A_fkey" FOREIGN KEY ("A") REFERENCES public.job_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _JobPostToLabour _JobPostToLabour_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_JobPostToLabour"
    ADD CONSTRAINT "_JobPostToLabour_B_fkey" FOREIGN KEY ("B") REFERENCES public.labors(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: accounts accounts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: answers answers_communityPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_communityPostId_fkey" FOREIGN KEY ("communityPostId") REFERENCES public.community_posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: answers answers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT "answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blogs blogs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT "blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_items cart_items_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_items cart_items_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carts carts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: community_posts community_posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.community_posts
    ADD CONSTRAINT "community_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: labors labors_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labors
    ADD CONSTRAINT "labors_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: managements managements_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.managements
    ADD CONSTRAINT "managements_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: products products_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: votes votes_answerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES public.answers(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: votes votes_communityPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_communityPostId_fkey" FOREIGN KEY ("communityPostId") REFERENCES public.community_posts(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: votes votes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

