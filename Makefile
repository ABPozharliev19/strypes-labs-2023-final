SERVER_CONTAINER := raspberry-pi-shop-web-1

migrate:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run python manage.py migrate"

cron:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run python manage.py runcrons"

scrapers:
	docker exec ${SERVER_CONTAINER} bash -c "poetry run scrapy crawl erelement"
