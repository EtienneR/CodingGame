## Installation de la stack

### Pré-requis

- Docker + Docker Compose (`docker version && docker-compose version`).

### Procédure

Placez-vous dans le répertoire de l'application puis lancez la commande `$ docker-compose up`.  
Cela aura pour conséquence de créer 3 containers :

- Mongo
- API (ExpressJS)
- Front (VueJS)

### Récapitulatif

| Nom | Port |
| --- | ---- |
| Postgres | 27017 |
| API | 1234 | |
| Front | 8081 |
