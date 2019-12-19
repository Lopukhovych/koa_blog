#!/bin/bash

USER_NAME="${DEV_USER_NAME}"
USER_PASS="${DEV_USER_PASSWORD}"

DATABASE="${DATABASE}"

if psql -t -c '\du' | cut -d \| -f 1 | grep -qw $USER_NAME; then
  echo "admin exists"
else
  echo "admin does not exist"
  psql -qc "CREATE USER $USER_NAME WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  CREATEROLE
  NOREPLICATION
  PASSWORD '$USER_PASS';"
  psql -qc "GRANT $USER_NAME TO postgres;"
  echo "admin created"
fi

if psql -lqt | cut -d \| -f 1 | grep -qw "$DATABASE"; then
  echo "koa_first_db exist"
else
  echo "db does not exist"
  psql -qc "CREATE DATABASE \"$DATABASE\"
  OWNER =  $USER_NAME;"
  echo "db created"
fi

if ! npm -g ls | grep sequelize-cli; then
  echo "install sequelize-cli"
  npm install -g sequelize-cli
else
  echo "sequelize-cli exist"
fi

if ! npm -g ls | grep pm2; then
  echo "install pm2"
  npm install -g pm2@latest
else
  echo "pm2 exist"
fi

cd backend && sequelize db:migrate && cd ..
npm install --prefix backend
npm run --prefix frontend build_local
npm run --prefix backend prod
