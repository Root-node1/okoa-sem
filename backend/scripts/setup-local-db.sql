-- Native PostgreSQL development setup for Okoa Sem.
-- Run this file as a PostgreSQL superuser, for example:
--   psql -U postgres -f backend/scripts/setup-local-db.sql
--
-- Replace YOUR_LOCAL_PASSWORD before running. Do not commit a real password.

CREATE USER okoa_sem_dev WITH PASSWORD 'YOUR_LOCAL_PASSWORD';
CREATE DATABASE okoa_sem_dev OWNER okoa_sem_dev;
GRANT ALL PRIVILEGES ON DATABASE okoa_sem_dev TO okoa_sem_dev;

-- For the test suite, create a separate database:
-- CREATE USER okoa_sem_test WITH PASSWORD 'YOUR_LOCAL_PASSWORD';
-- CREATE DATABASE okoa_sem_test OWNER okoa_sem_test;
-- GRANT ALL PRIVILEGES ON DATABASE okoa_sem_test TO okoa_sem_test;
