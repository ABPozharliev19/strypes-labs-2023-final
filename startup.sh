#!/bin/bash

echo 'Waiting for Postgres to load';
while !</dev/tcp/db/5432;
 do sleep 1;
done;

echo 'Waiting for elasticsearch to load';
while !</dev/tcp/elasticsearch/9200;
 do sleep 1;
done;


poetry run scrapy crawl erelement
poetry run scrapy crawl robotev
poetry run scrapy crawl mobilestore

# Run server
poetry run uvicorn server.main:app --reload --host 0.0.0.0 --port 8000

