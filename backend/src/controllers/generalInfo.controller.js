const {
  getAboutUsInfo, getTeamInfo, getContactUsInfo, proceedContactUsMessage,
} = require('src/services/generalInfo.service');
const {setBadRequest} = require('src/middleware/exception.middleware');

async function aboutUsHandler(ctx) {
  try {
    const info = await getAboutUsInfo();
    const team = await getTeamInfo(info.team);
    ctx.body = {...info, team};
  } catch (error) {
    console.error('Error_controller aboutUsHandler: ', error.message);
    await setBadRequest(ctx, error);
  }
}

async function contactUsGetHandler(ctx) {
  try {
    const info = await getContactUsInfo();
    ctx.body = {...info};
  } catch (error) {
    console.error('Error_controller contactUsGetHandler: ', error.message);
    await setBadRequest(ctx, error);
  }
}

async function contactUsSendMessageHandler(ctx) {
  try {
    const { name, email, message } = ctx.request.body;
    await proceedContactUsMessage(name, email, message);
    ctx.status = 200;
    ctx.body = {
      success: true,
    };
  } catch (error) {
    console.error('Error_controller contactUsSendMessageHandler: ', error.message);
    await setBadRequest(ctx, error);
  }
}


module.exports = {
  aboutUsHandler, contactUsGetHandler, contactUsSendMessageHandler,
};
