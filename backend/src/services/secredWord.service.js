const bcrypt = require('bcryptjs');

async function hashSecretWord(secretWord) {
  return bcrypt.hash(secretWord, 10);
}

module.exports = {
  hashSecretWord,
};
