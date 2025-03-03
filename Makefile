SERVICE_NAME=SAD_frontend

build:
	docker-compose -f docker-compose.yaml build

up:
	docker-compose -f docker-compose.yaml up

upd:
	docker-compose -f docker-compose.yaml up -d

stop:
	docker-compose -f docker-compose.yaml stop

down:
	docker-compose -f docker-compose.yaml down

restart:
	docker-compose -f docker-compose.yaml down
	docker-compose -f docker-compose.yaml up -d

logs:
	docker-compose -f docker-compose.yaml logs -f $(SERVICE_NAME)

status:
	docker-compose ps

prod-build:
	docker-compose -f docker-compose.production.yaml build

prod-up:
	docker-compose -f docker-compose.production.yaml up -d

prod-logs:
	docker-compose -f docker-compose.production.yaml logs -f $(SERVICE_NAME)
