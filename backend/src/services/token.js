const {jwtAuth} = require('src/auth');

async function checkForRefreshToken(decodedData, userInfo) {
  if (Math.floor((new Date(decodedData.exp * 1000) - new Date()) / (1000 * 3600 * 24)) < 2) {
    return jwtAuth.sign({ ...userInfo });
  }
  return null;
}

module.exports = {
  checkForRefreshToken,
};
