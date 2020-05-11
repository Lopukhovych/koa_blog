const models = require('models');
const { Op } = require('sequelize');
const { userRoles } = require('src/constants');

async function findByRoleId(id) {
  return models.Role.findOne({ where: { id: +id }, raw: true });
}

async function findRoleByTitle(title) {
  return models.Role.findOne({ where: { title }, raw: true });
}

async function findModeratorIds() {
  return models.Role
    .findAll({
      attributes: ['id'],
      where: {
        [Op.or]: [
          { title: userRoles.admin },
          { title: userRoles.moderator },
        ],
      },
      raw: true,
    }).then(async (list) => list.map((item) => item.id));
}

async function findAdminRole() {
  return models.Role.findOne({where: {title: userRoles.admin}});
}

module.exports = {
  findByRoleId,
  findRoleByTitle,
  findModeratorIds,
  findAdminRole,
};
