#!/bin/bash

USER_NAME="${USER_NAME}"
USER_PASS="${USER_PASSWORD}"

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
  echo "$DATABASE exist"
else
  echo "db does not exist"
  psql -qc "CREATE DATABASE \"$DATABASE\"
  OWNER =  $USER_NAME;"
  echo "db created"
fi
echo '________________________'

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

cd frontend || exit
npm run build_local && cd ..
echo 'frontend installed'

cd backend || exit
npm install
echo 'backend installed'

sequelize db:migrate
echo 'migrated'

npm run prod
echo 'runned prod'
