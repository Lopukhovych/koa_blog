const models = require('models/index');

async function createUser(userData) {
  return models.Users.create(userData);
}

async function findOneUser(condition) {
  return models.Users.findOne({ where: { ...condition }});
}

module.exports = {
  createUser,
  findOneUser,
};
