const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'defaultsecret';

function generarToken (payload) {
  return jwt.sign(payload, secret, { expiresIn: '8h' });
};

function verificarToken (token) {
  return jwt.verify(token, secret);
};

module.exports = {
    generarToken,
    verificarToken
};