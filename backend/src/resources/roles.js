const models = require('models');

async function findByRoleId(id) {
  return models.Role.findOne({ where: { id: +id }, raw: true });
}

async function findRoleByTitle(title) {
  return models.Role.findOne({ where: { title }, raw: true });
}

module.exports = {
  findByRoleId,
  findRoleByTitle,
};
