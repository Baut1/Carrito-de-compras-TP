const logsModel = require('../models/logs.model');

const logsMiddleware = (req, res, next) => {
  const user = req.user || {};

  res.on('finish', () => {
    logsModel.registrar({
      user_id: user.id || null,
      endpoint: req.originalUrl,
      metodo: req.method,
      estado: res.statusCode,
      mensaje: `Peticion ${req.method} hacia ${req.originalUrl} con status: ${res.statusCode}`
    });
  });

  next();
};

module.exports = logsMiddleware;
