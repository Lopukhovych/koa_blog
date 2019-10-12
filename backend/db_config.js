require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable:'url',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable:'url',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    use_env_variable:'url',
  },
};
