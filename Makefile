ifeq ($(OS),Windows_NT)
SHELL := cmd.exe
endif

.PHONY: help install install-server install-web run dev run-server run-web build build-server build-web lint lint-server lint-web test

help:
	@echo Available commands:
	@echo   make install         - Install dependencies for both server and web
	@echo   make install-server  - Install dependencies for backend server
	@echo   make install-web     - Install dependencies for frontend web app
	@echo   make run             - Run both server and web in development mode
	@echo   make run-server      - Run backend server in watch mode
	@echo   make run-web         - Run frontend web dev server
	@echo   make build           - Build both server and web
	@echo   make lint            - Lint both server and web
	@echo   make test            - Run backend unit tests

install: install-server install-web

install-server:
	npm --prefix server install

install-web:
	npm --prefix web install

run: dev

dev:
	$(MAKE) -j2 run-server run-web

run-server:
	npm --prefix server run start:dev

run-web:
	npm --prefix web run dev

build: build-server build-web

build-server:
	npm --prefix server run build

build-web:
	npm --prefix web run build

lint: lint-server lint-web

lint-server:
	npm --prefix server run lint

lint-web:
	npm --prefix web run lint

test:
	npm --prefix server test
