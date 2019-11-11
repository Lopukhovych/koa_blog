const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKEY = fs.readFileSync(path.resolve(__dirname, '.private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.resolve(__dirname, '.public.key'), 'utf8');

const sOptions = {
  issuer: 'Koa blog',
  subject: 'koa.admin@koa.blog.com',
  audience: 'koa-audience', // this should be provided by client
};

module.exports = {
  async sign(payload) {
    const signOptions = {
      ...sOptions,
      // TODO change expiresIn to 2 days
      expiresIn: '30d', // 30 days validity
      algorithm: 'RS256',
    };
    return jwt.sign(payload, privateKEY, signOptions);
  },
  async verify(token) {
    const verifyOptions = {
      ...sOptions,
      expiresIn: '30d',
      algorithm: ['RS256'],
    };
    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: (token) => jwt.decode(token, { complete: true }),
  // returns null if token is invalid

};
