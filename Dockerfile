FROM python:3.9-slim

WORKDIR /app

# Instala o SQLite3 explicitamente
RUN apt-get update && apt-get install -y sqlite3

# Instala a interface web
RUN pip install sqlite-web

# Copia o arquivo SQL
COPY init.sql .

# Cria o banco usando o arquivo SQL
RUN sqlite3 musical.db < init.sql

# Configura a porta e o comando de inicializacao
EXPOSE 8080
CMD ["sqlite_web", "-H", "0.0.0.0", "-p", "8080", "musical.db"]