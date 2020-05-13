const bcrypt = require('bcryptjs');

async function comparePassword(enteredPass, user) {
  try {
    if (!enteredPass) {
      throw new Error('No entered password');
    }
    const {password} = user;
    return bcrypt.compare(enteredPass, password);
  } catch (error) {
    console.error('Error_service comparePassword:', error);
    throw new Error('Password is invalid');
  }
}

async function validateRestorePassData(email, enteredSecretWord, newPassword) {
  try {
    if (!email || !enteredSecretWord || !newPassword) {
      throw new Error();
    }
  } catch (error) {
    console.error('Error_service validateRestorePassData:', error);
    throw new Error('Entered data is invalid');
  }
}

async function validateEnteredPassword(user, newPassword, enteredSecretWord) {
  try {
    const {secretWord, password} = user;
    const comparedSecretWord = await bcrypt.compare(enteredSecretWord, secretWord);
    const comparedPass = await bcrypt.compare(newPassword, password);

    if (!comparedSecretWord) {
      throw new Error('Secret word is incorrect');
    }

    if (comparedPass) {
      throw new Error('New password is equal with old one');
    }
  } catch (error) {
    console.error('Error_service validatEnteredPassword:', error);
    throw new Error('Entered data is invalid');
  }
}

async function hashPassword(password) {
  return bcrypt.hash(password, 8);
}

module.exports = {
  comparePassword,
  validateRestorePassData,
  validateEnteredPassword,
  hashPassword,
};
