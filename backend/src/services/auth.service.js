const {jwtAuth} = require('src/auth');

async function verifyToken(token) {
  try {
    const verified = await jwtAuth.verify(token);
    if (!verified) {
      throw new Error();
    }
    return verified;
  } catch (error) {
    console.error('Error_service verifyToken:', error);
    throw new Error('Cannot verify token');
  }
}

async function validateSignUpData(email, password) {
  try {
    if (!password || !email) {
      throw new Error();
    }
    return;
  } catch (error) {
    console.error('Error_service validateSignUpData:', error);
    throw new Error('Invalid sign up data');
  }
}

module.exports = {
  verifyToken,
  validateSignUpData,
};
