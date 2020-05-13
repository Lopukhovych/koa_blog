const {jwtAuth} = require('src/auth');

async function checkForRefreshToken(exp, userInfo) {
  try {
    if (Math.floor((new Date(exp * 1000) - new Date()) / (1000 * 3600 * 24)) < 2) {
      return jwtAuth.sign({ ...userInfo });
    }
    return null;
  } catch (error) {
    console.log('Error_service checkForRefreshToken:', error);
    throw new Error('Cannot check refresh token');
  }
}

async function signToken(user) {
  try {
    return jwtAuth.sign(user);
  } catch (error) {
    console.log('Error_service signToken:', error);
    throw new Error('Cannot sign user');
  }
}

module.exports = {
  checkForRefreshToken,
  signToken,
};
