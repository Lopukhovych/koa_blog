const models = require('models/index');
const {jwtAuth} = require('src/auth');
const { userRoles } = require('src/constants');

async function setBadRequest(ctx, error) {
  ctx.status = 400;
  ctx.body = {
    originalError: 'Bad Request',
    message: error.message,
  };
}

async function setUnauthorized(ctx) {
  return ctx.throw(
    401,
    'UNAUTHORIZED',
    { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' } },
  );
}

async function setForbidden(ctx) {
  return ctx.throw(
    403,
    'FORBIDDEN',
    { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' } },
  );
}

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
  auth, authAdmin, setBadRequest, setForbidden, setUnauthorized,
};
