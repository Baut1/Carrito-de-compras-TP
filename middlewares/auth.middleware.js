const { verificarToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'error: no se ncuentra el token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verificarToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'token no valido o expirado' });
  }
};

module.exports = authMiddleware;
