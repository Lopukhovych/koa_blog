const models = require('models');
const {Op} = require('sequelize');

async function findGeneralInfoByTitle(title) {
  return models.GeneralInfo.findOne({ where: { title } });
}

async function findTeamMembersByIds(teamsIds) {
  return models.Users.findAll({
    attributes: [
      'id',
      'email',
      'userInfo',
    ],
    where: { status: 'active', id: {[Op.in]: teamsIds} },
  });
}

module.exports = {
  findGeneralInfoByTitle,
  findTeamMembersByIds,
};
