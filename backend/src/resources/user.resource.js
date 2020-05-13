const Sequelize = require('sequelize');

const models = require('models');
const {userStatus} = require('src/constants');

const {Op} = Sequelize;

async function createUser(userData) {
  return models.Users.create(userData);
}

async function findOneUser(condition) {
  return models.Users.findOne({ where: { ...condition }});
}

async function findAllActiveUsers(attributes) {
  return models.Users.findAll({
    attributes: {
      ...attributes,
      exclude: ['secretWord', 'password', 'refreshData'],
    },
    where: Sequelize.and(
      { status: userStatus.active },
    ),
  });
}

async function findAllAuthors(attributes, authorRoleIds) {
  return models.Users.findAll({
    attributes: {
      ...attributes,
      exclude: ['secretWord', 'password', 'refreshData'],
    },
    where: Sequelize.and(
      { status: userStatus.active },
      { roleId: {[Op.in]: authorRoleIds} },
    ),
  });
}

async function findAllUsers(attributes) {
  return models.Users.findAll({
    attributes: {
      ...attributes,
      exclude: ['secretWord', 'password', 'refreshData'],
    },
  });
}

module.exports = {
  createUser,
  findOneUser,
  findAllActiveUsers,
  findAllAuthors,
  findAllUsers,
};
