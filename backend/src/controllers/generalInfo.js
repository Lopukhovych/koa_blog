const models = require('models');
const {pageTitles} = require('src/constants');
const Sequelize = require('sequelize');

const {Op} = Sequelize;

async function aboutUsHandler(ctx) {
  try {
    const info = JSON.parse(await models.GeneralInfo
      .findOne({ where: { title: pageTitles.aboutUs } }, {raw: true}).get('info'));

    const team = await models.Users.findAll({
      attributes: [
        'id',
        'email',
        'userInfo',
      ],
      where: { status: 'active', id: {[Op.in]: info.team} },
      raw: true,
    })
      .map(({id, email, userInfo}) => ({id, name: userInfo.name ? userInfo.name : email}));
    ctx.body = {...info, team};
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  aboutUsHandler,
};
