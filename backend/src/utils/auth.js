const models = require('models/index');
const {jwtAuth} = require('src/auth');
const { userRoles } = require('src/constants');

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

module.exports = {
  auth, setForbidden, setUnauthorized,
};
