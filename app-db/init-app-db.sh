#!/bin/bash

set -ex
for dbname in feeds feedstest
do
    echo "START INIT DATABASE '$dbname'!!!!!!!!!!!"
    psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" --dbname "$POSTGRES_DB" \
    -c "CREATE DATABASE $dbname;"
    echo "DATABASE '$dbname' created !!!!!!!!!!!"
    echo ${POSTGRES_DB}
    echo ${dbname}
    # -u postgres -i
    # serviceName="${dbname//_/-}"
    echo "import sql file .........."
    psql -U $POSTGRES_USER -d $dbname < /docker-entrypoint-initdb.d/init-script/$dbname.sql
    echo "DATABASE schema for '$dbname' created !!!!!!!!!!!"
done