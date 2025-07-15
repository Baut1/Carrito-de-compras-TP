const { registerUser, loginUser } = require('../services/auth.service');
const { generarToken } = require('../utils/jwt');

function register (req, res) {
  const { email, password } = req.body;
  try {
    registerUser(email, password);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {    
    res.status(400).json({ error: err.message });
  }
};

function login (req, res) {
  const { email, password } = req.body;
  try {
    const user = loginUser(email, password);
    const token = generarToken(user);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

function me (req, res) {
  res.json({ user: req.user });
};

module.exports = {
    register,
    login,
    me
};