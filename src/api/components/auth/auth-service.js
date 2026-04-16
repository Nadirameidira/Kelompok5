const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
const { passwordMatched } = require('../../../utils/password');

function generateToken(email) {
  const secretKey = 'MBG';

  const payload = {
    email,
    timestamp: Date.now(),
  };

  return jwt.sign(payload, secretKey, {
    expiresIn: '1d',
  });
}

async function checkLogin(email, password) {
  const user = await authRepository.getUserByEmail(email);
  // tetep harus cek pass walopun gaada

  const userPass = user ? user.password : '<RANDOM> ';
  // kalo gaad password kasih random
  const loginPassed = await passwordMatched(password, userPass);

  if (user && loginPassed) {
    return {
      email: user.email,
      token: generateToken(email),
    };
  }

  return null;
}

module.exports = { checkLogin };
