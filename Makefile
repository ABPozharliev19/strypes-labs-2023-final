SERVER_CONTAINER := strypes-labs-2023-final-web-1

dev:
	cd client && npm run dev

build:
	cd client && npm run build

start:
	docker-compose up -d

stop:
	docker-compose down

restart:
	docker-compose restart

run_robotev:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run scrapy crawl robotev"

run_erelement:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run scrapy crawl erelement"

run_mobilestore:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run scrapy crawl mobilestore"

run_scrapers: run_erelement run_robotev run_mobilestore