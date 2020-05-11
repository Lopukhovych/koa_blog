const {jwtAuth} = require('src/auth');
const {findModeratorIds, findAdminRole} = require('src/resources/roles');
const {setUnauthorized} = require('./exception.middleware');


async function auth(ctx, next) {
  try {
    const {authorization: token} = ctx.request.header;
    const verified = await jwtAuth.verify(token);
    if (!verified) {
      return setUnauthorized(ctx);
    }
    next();
  } catch (error) {
    console.error('Error_middleware auth: ', error.message);
    throw new Error('Cannot auth user');
  }
}

async function moderatorAuth(ctx, next) {
  try {
    const {authorization: token} = ctx.request.header;
    const verified = await jwtAuth.verify(token);
    const roleIds = await findModeratorIds();
    if (!verified) {
      return setUnauthorized(ctx);
    }
    if (!roleIds.includes(verified.roleId)) {
      throw new Error();
    }
    next();
  } catch (error) {
    console.error('Error_middleware moderatorAuth: ', error.message);
    throw new Error('User does not have enough permissions');
  }
}

async function adminAuth(ctx, next) {
  try {
    const {authorization: token} = ctx.request.header;
    const verified = await jwtAuth.verify(token);
    const {id: adminRoleId} = await findAdminRole();
    if (!verified) {
      return setUnauthorized(ctx);
    }
    if (verified.roleId !== adminRoleId) {
      throw new Error();
    }
    next();
  } catch (error) {
    console.error('Error_middleware adminAuth: ', error.message);
    throw new Error('User does not have enough permissions');
  }
}

module.exports = {
  auth,
  adminAuth,
  moderatorAuth,
};
