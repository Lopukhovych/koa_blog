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

async function contactUsGetHandler(ctx) {
  try {
    const info = JSON.parse(await models.GeneralInfo
      .findOne({ where: { title: pageTitles.contactUs } }, {raw: true}).get('info'));
    ctx.body = {...info};
  } catch (error) {
    console.error(error.message);
  }
}

async function contactUsSendMessageHandler(ctx) {
  try {
    const { name, email, message } = ctx.request.body;
    ctx.status = 200;
    ctx.body = {};
    console.log('contactUsSendMessageHandler: ', name, email, message);
  } catch (error) {
    console.error(error.message);
  }
}


module.exports = {
  aboutUsHandler, contactUsGetHandler, contactUsSendMessageHandler,
};
