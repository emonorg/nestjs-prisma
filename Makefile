PROJECT_NAME = nestjs-prisma
DOCKER_COMPOSE_FILE = docker-compose.yml

#aliases

.PHONY: run
run:
	@pnpm run start:dev

.PHONY: build
build:
	@pnpm run build

.PHONY: test
test:
	@pnpm run test

.PHONY: test:e2e
test:e2e:
	@pnpm run test:e2e

.PHONY: migrate
migrate:
	@pnpm run prisma migrate dev

.PHONY: db:push
db:push:
	@pnpm run prisma db push

.PHONY: db:seed
db:seed:
	@pnpm run prisma db seed

.PHONY: lint
lint:
	@pnpm run lint

.PHONY: format
format:
	@pnpm run format
