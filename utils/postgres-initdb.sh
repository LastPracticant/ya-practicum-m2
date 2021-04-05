#!/bin/sh -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    INSERT INTO public."forumTopics" ("name", "description", "userId", "creationDate") VALUES
    ('topic 1', 'Hello world 1!', 0, '2021-05-04 10:23:54'),
    ('topic 2', 'Hello world 2!', 0, '2021-05-04 10:23:54'),
    ('topic 3', 'Hello world 3!', 0, '2021-05-04 10:23:54'),
    ('topic 4', 'Hello world 4!', 0, '2021-05-04 10:23:54'),
    ('topic 5', 'Hello world 5!', 0, '2021-05-04 10:23:54');

    INSERT INTO public."forumComments" ("description", "userId", "parentId", "topicId", "creationDate") VALUES
    ('topic 1', 0, 0, 1, '2021-05-04 10:23:54'),
    ('topic 2', 0, 0, 1, '2021-05-04 10:23:54'),
    ('topic 3', 0, 0, 1, '2021-05-04 10:23:54'),
    ('topic 4', 0, 0, 1, '2021-05-04 10:23:54'),
    ('topic 5', 0, 0, 1, '2021-05-04 10:23:54');
EOSQL