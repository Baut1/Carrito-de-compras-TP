const logsModel = require('../models/logs.model');

const logsMiddleware = (req, res, next) => {
  const user = req.user || {};
  const start = Date.now();

  res.on('finish', () => {
    logsModel.registrar({
      user_id: user.id || null,
      endpoint: req.originalUrl,
      metodo: req.method,
      estado: res.statusCode,
      mensaje: `${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - start}ms)`
    });
  });

  next();
};

module.exports = logsMiddleware;
