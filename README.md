# Wordle API — FastAPI | SQLAlchemy | PostgreSQL | Docker

## Tabla de contenidos
- [Wordle API — FastAPI | SQLAlchemy | PostgreSQL | Docker](#wordle-api--fastapi--sqlalchemy--postgresql--docker)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [¿Qué es FastAPI?](#qué-es-fastapi)
  - [¿Por qué usar FastAPI aquí?](#por-qué-usar-fastapi-aquí)
  - [Stack y arquitectura del proyecto](#stack-y-arquitectura-del-proyecto)
  - [Requisitos previos](#requisitos-previos)
  - [Clonar/instalar dependencias](#clonarinstalar-dependencias)
  - [Base de datos con Docker](#base-de-datos-con-docker)
  - [Variables de entorno](#variables-de-entorno)
  - [Migraciones con Alembic](#migraciones-con-alembic)
  - [Levantar la API](#levantar-la-api)
  - [Endpoints principales](#endpoints-principales)
    - [Words](#words)
    - [Games](#games)
    - [Guesses](#guesses)
  - [Probar rápido (cURL o Postman)](#probar-rápido-curl-o-postman)
    - [Sembrar palabras](#sembrar-palabras)
    - [Crear partida](#crear-partida)
    - [Hacer un intento](#hacer-un-intento)

---

## ¿Qué es FastAPI?
FastAPI es un framework moderno para construir APIs en Python, con tipado estático, validación automática y documentación interactiva (OpenAPI).

## ¿Por qué usar FastAPI aquí?
- Validación con Pydantic
- Documentación OpenAPI lista
- Integración con SQLAlchemy y Alembic

## Stack y arquitectura del proyecto
- **FastAPI** 
- **SQLAlchemy 2.0** + **Alembic**
- **PostgreSQL** 
- **Arquitectura por features**: words, games, guesses

```bash
app/
├─ api/router.py
├─ core/{config, middleware, lifespan}.py
├─ db/{base.py, session.py}
├─ features/
│  ├─ words/
│  ├─ games/
│  └─ guesses/
└─ main.py
```

## Requisitos previos
- Python 3.11+
- Docker
- pip / venv

## Clonar/instalar dependencias
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Base de datos con Docker
```yaml
services:
  db:
    image: postgres:17
    container_name: wordle-postgres
    environment:
      POSTGRES_USER: wordle
      POSTGRES_PASSWORD: wordle
      POSTGRES_DB: wordle
    ports:
      - "5431:5432"
    volumes:
      - wordle_pgdata:/var/lib/postgresql/data
volumes:
  wordle_pgdata:

```
Levanta la BD:
```bash
docker compose up -d
```

## Variables de entorno
```
DEBUG=true
DATABASE_URL=postgresql+psycopg://wordle:wordle@localhost:5431/wordle
ALLOWED_ORIGINS=["http://localhost:5173"]
```

## Migraciones con Alembic
Aplicar migraciones:
```bash
alembic upgrade head
```

## Levantar la API
```bash
cd wordleAPI/
fastapi dev app/main.py
```

## Endpoints principales
### Words
- GET `/api/v1/words`
- GET `/api/v1/words/random`
- GET `/api/v1/words/exists?text=PERRO`
- POST `/api/v1/words/bulk`

### Games
- POST `/api/v1/games`
- GET `/api/v1/games/{id}`

### Guesses
- POST `/api/v1/guesses/{game_id}`

## Probar rápido (cURL o Postman)

### Sembrar palabras
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/words/bulk"   -H "Content-Type: application/json"   -d '{"words":["PERRO","SALSA","LIMON","NIEVE","PLAZA"]}'
```

### Crear partida
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/games"   -H "Content-Type: application/json" -d '{}'
```

### Hacer un intento
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/guesses/1"   -H "Content-Type: application/json"   -d '{"text":"PERRO"}'
```

> 💡 **Sugerencia**:
> Cuando levantes el servidor con
>
> ```bash
> fastapo dev app/main.py
> ```
>
> entra a [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).
> Allí podrás **probar** los endpoints directamente o, desde el botón superior izquierdo, **descargar el JSON de OpenAPI** (`/openapi.json`) e importarlo en Postman para tener la colección lista automáticamente.


