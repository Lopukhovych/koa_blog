const {jwtAuth} = require('src/auth');
const models = require('models/index');
const { userRoles } = require('src/constants');
const {setUnauthorized} = require('./exception');

async function auth(ctx, next) {
  try {
    const token = ctx.request.header.authorization;
    const verified = await jwtAuth.verify(token);
    if (!verified) {
      return await setUnauthorized(ctx);
    }
    next();
  } catch (error) {
    console.error('controllers auth error');
    throw Error(error);
  }
}

async function authAdmin(ctx, next) {
  try {
    const token = ctx.request.header.authorization;
    const verified = await jwtAuth.verify(token);
    const adminRoleId = await models.Role.findOne({where: {title: userRoles.admin}}).get('id');
    if (!verified) {
      return await setUnauthorized(ctx);
    }
    if (verified.roleId !== adminRoleId) {
      return await ctx.throw(
        400,
        'Bad Request',
        {
          headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
          message: 'User does not have permissions',
        },
      );
    }
    next();
  } catch (error) {
    throw Error(error);
  }
}

module.exports = {
  auth,
  authAdmin,
};
