SERVER_CONTAINER := strypes-labs-2023-final-web-1

dev:
	cd client && npm run dev

frontend-test:
	cd client && npm run test

test: frontend-test

run_robotev:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run scrapy crawl robotev"

run_erelement:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run scrapy crawl erelement"

run_mobilestore:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run scrapy crawl mobilestore"

run_scrapers: run_erelement run_robotev run_mobilestore