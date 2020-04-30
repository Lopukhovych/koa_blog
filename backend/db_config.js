require('dotenv').config();
const {
  DEV_DATABASE_URL,
  TEST_DATABASE_URL,
  DATABASE_URL,
} = require('./config');

module.exports = {
  development: {
    url: DEV_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'url',
  },
  test: {
    url: TEST_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'url',
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'url',
  },
};
