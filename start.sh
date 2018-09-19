#!/usr/bin/env bash

docker-compose down
docker-compose up -d --force-recreate
#docker exec -it science-internationality-index-db bash -c 'psql -h 127.0.0.1 -U root -d root < /SCHEMA.sql'

