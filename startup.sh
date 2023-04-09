#!/bin/bash

echo 'Waiting for Postgres to load';

while !</dev/tcp/db/5432;
 do sleep 1;
done;

# Run scrapers
poetry run scrapy crawl erelement