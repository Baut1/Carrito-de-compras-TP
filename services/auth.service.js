const bcrypt = require('bcryptjs');
const db = require('../config/db');

function registerUser (email, password, role_id = 2) {
  const exists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (exists) throw new Error('error: el usuario ya existe!');

  const hash = bcrypt.hashSync(password, 10);
  db.prepare('INSERT INTO users (user, email, role_id, password_hash) VALUES (?, ?, ?, ?)').run(email, email, role_id, hash);
};

function loginUser (email, password) {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) throw new Error('error: credenciales inválidas');

  const isValid = bcrypt.compareSync(password, user.password_hash);
  if (!isValid) throw new Error('error: credenciales inválidas');

  return { id: user.id, email: user.email, role_id: user.role_id };
};

module.exports = {
    registerUser,
    loginUser
};