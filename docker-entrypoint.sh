#!/bin/bash

# Add:
# COPY docker-entrypoint.sh ./
# RUN ["chmod", "+x", "./docker-entrypoint.sh"]
# ENTRYPOINT ["./docker-entrypoint.sh"]
# to the Dockerfile


#  Exit immediately if a future command exits with a non-zero status.
set -e

echo "[Entrypoint Script] Initializing Environment."

# Remap Walhall provided variables to the ones used by the app.
export PGUSER="$DATABASE_USER"
export PGPASSWORD="$DATABASE_PASSWORD"
export PGDATABASE="$DATABASE_NAME"
export PGHOST="$DATABASE_HOST"
export PGPORT="$DATABASE_PORT"

# Initialize the Database
# NOTE: We already have the environmental variables configured
# node ./bin/init_db.js

echo "[Entrypoint Script] Initialization Complete. Running command."
# Run the command defined as CMD
exec "$@"
