import os
from dotenv import load_dotenv
from logging.config import fileConfig
from alembic import context, config  # Corrigindo a importação
from sqlalchemy import engine_from_config, pool

# Definindo os códigos de escape ANSI para mudar a cor do texto
COLOR_RED = '\033[91m'  # Vermelho
COLOR_RESET = '\033[0m'  # Resetar a cor

# Carregar as variáveis de ambiente do arquivo .env
load_dotenv()

# Obter as URLs do banco de dados do ambiente
DATABASE_URL1 = os.getenv("DATABASE_URL1")

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
configuration = context.config



# Configurar as URLs do banco de dados para o Alembic
for var_name, var_value in [("DATABASE_URL1", DATABASE_URL1)]:
    if var_value:
        configuration.set_section_option("alembic", var_name, var_value)
    else:
        print(f"-- {COLOR_RED}ALERTA: A variável de ambiente {var_name} não está definida.{COLOR_RESET}")

# Interpretar o arquivo de configuração para registro em Python.
# Esta linha configura basicamente os loggers.
if configuration.config_file_name is not None:
    fileConfig(configuration.config_file_name)

# Adicione o objeto MetaData do seu modelo aqui
# para suporte a 'autogenerate'
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = None

def run_migrations_offline() -> None:
    """Execute migrações no modo 'offline'.

    Isso configura o contexto apenas com uma URL
    e não um Engine, embora um Engine seja aceitável
    aqui também. Ao pular a criação do Engine,
    nem mesmo precisamos de um DBAPI disponível.

    As chamadas para context.execute() aqui emitem a string fornecida para a
    saída do script.

    """
    for database_url in [DATABASE_URL1]:
        if database_url:
            configuration.configure(
                url=database_url,
                target_metadata=target_metadata,
                literal_binds=True,
                compare_type=True,
                render_as_batch=True,
                dialect_opts={"paramstyle": "named"},
            )

            with configuration.begin_transaction():
                configuration.run_migrations()

def run_migrations_online() -> None:
    """Execute migrações no modo 'online'.

    Nesse cenário, precisamos criar um Engine
    e associar uma conexão ao contexto.

    """
    for database_url in [DATABASE_URL1]:
        if database_url:
            engine = engine_from_config(
                configuration.get_section(configuration.config_ini_section),
                prefix="sqlalchemy.",
                poolclass=pool.NullPool,
                url=database_url  # Definindo a URL do banco de dados diretamente aqui
            )

            with engine.connect() as connection:
                context.configure(
                    connection=connection, 
                    target_metadata=target_metadata,
                    compare_type=True,
                    render_as_batch=True,
                )

                with context.begin_transaction():
                    context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
