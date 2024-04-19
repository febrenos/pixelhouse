### Projeto fullstack


#### TODO
- [x] Conexão com o banco
- [x] Banco de dados evolutivo com o código
- [x] API com documentação swagger
- [x] CI, continuals integration database
- [x] Migrations database with alembic, SQLAlchemy

# SOBRE O PROJETO

| tipo | tecnologia |
|---|---|---|
| Front-end | React.js |
| Back-end | Python |
| Banco de dados | Postgres |

<details>
<summary>Front-end</summary>

#### Start API
1. npm i
2. npm start

```md
```

</details>

<details>
<summary>Back-end</summary>

#### Start API
1. poetry install
2. poetry shell
3. flask run

```md
    PythonRestApi
    ├── 
    ├── README.md
    ├── __pycache__
    ├── migrations
    │   ├── __pycache__
    │   ├── versions
    │   │   ├── __pycache__
    │   │   └── c7c5314e5349_first_migration.py
    │   ├── env.py
    │   ├── README
    │   └── script.py.mako
    ├── .env
    ├── alembic.ini
    ├── app.py <<<<<<<<<<<
    ├── poetry.lock
    ├── pyproject.toml
    └── README.md
```
após aplicar conceito Clean Arch e Design patterns

```md
PythonRestApi
├── README.md
├── app
│   ├── __init__.py
│   ├── controllers <<<<<<<<<<<
│   │   ├── __init__.py
│   │   └── user_controller.py
│   ├── db <<<<<<<<<<<
│   │   ├── __init__.py
│   │   └── base.py
│   ├── models <<<<<<<<<<<
│   │   ├── __init__.py
│   │   └── user.py
│   ├── repositories <<<<<<<<<<<
│   │   ├── __init__.py
│   │   └── user_repository.py
│   └── services <<<<<<<<<<<
│       ├── __init__.py
│       └── user_service.py
├── migrations
│   ├── __init__.py
│   ├── __pycache__
│   ├── env.py
│   ├── README
│   └── script.py.mako
├── .env
├── alembic.ini
├── pyproject.toml
└── README.md
```

</details>

<details>
<summary>Banco de dados</summary>

1. use uma IDE de banco de dados
2. informe os dados e faça a coneção
3. 

| Coluna | tipo |
|---|---|---|
| id | Integer, primary_key=True |
| name | String |
| bornIn | Date |
| email | String |
| password | String |


#### Start API


</details>


#### Alembic | SQLAlchemy
1. poetry add alembic
2. alembic init NameMigrations
3. alembic revision -m "first migration"
4. create upgrade() e downgrade() in NameMigrations > versions > c7c5314e5349_first_migration.py



| command | description |
|---|---|
| flask routes | view all routes from api |
| $env:FLASK_DEBUG = "1" && flask run | run automatic |
| $env:FLASK_DEBUG = "" && flask run | desactive automatic |
| alembic upgrade head | head ir para a migração final |
| alembic downgrade base | base ir para a migração inical |
| alembic history | histórico de migrações |
| select * from alembic_version | versao do alembic |
| alembic revision --autogenerate "ajustado campo x na tabela" | nova alteração, tipo um commit |
| alembic upgrade +1 ||
| alembic upgrade +1 --sql | up version |
| alembic downgrade +1 --sql > xpto.sql | mostrar o que ele faria para ir ao próximo|
| alembic downgrade c7c5314e5349:c7c5314e5349 --sql | actual:goTo |
| alembic downgrade c7c5314e5349:-1 --sql | actual:goTo |
| alembic downgrade head:-1 | actual:goTo |
| alembic downgrade head:-1 | actual:goTo |
| .exit | sair do código |