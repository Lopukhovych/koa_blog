const models = require('models/index');

async function createUser(userData) {
  return models.Users.create(userData);
}

async function findOneUser(condition) {
  return models.Users.findOne({ where: { ...condition }, raw: true });
}

module.exports = {
  createUser,
  findOneUser,
};
