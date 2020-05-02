async function handleException(ctx, next) {
  return next().catch((err) => {
    const { statusCode, message } = err;

    ctx.type = 'json';
    ctx.status = statusCode || 500;
    ctx.body = {
      status: 'error',
      message,
    };

    ctx.app.emit('error', err, ctx);
  });
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

async function setBadRequest(ctx, error) {
  ctx.status = 400;
  ctx.body = {
    originalError: 'Bad Request',
    message: error.message,
  };
}

module.exports = {
  handleException,
  setUnauthorized,
  setForbidden,
  setBadRequest,
};
