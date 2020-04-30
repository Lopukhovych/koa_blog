async function equalPasswordsError(ctx) {
  return ctx.throw(
    400,
    'FORBIDDEN',
    {
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      message: "You can't enter last password",
    },
  );
}

module.exports = {
  equalPasswordsError,
};
