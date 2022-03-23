build:
	docker-compose up 

dev:
	docker-compose  -f docker-compose-dev.yml up
	

stop:
	docker-compose down 

stop-delete:
	docker-compose down --rmi all

delete:
	docker image prune -a -f

clear:
	docker builder prune -a