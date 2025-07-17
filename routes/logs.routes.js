const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const logsModel = require('../models/logs.model');

router.get('/', auth, (req, res) => {    
  if (req.user.role_id !== 1) { // solo rol_id 1 es admin
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  const logs = logsModel.getAll();
  res.json(logs);
});

router.delete('/', auth, (req, res) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  logsModel.clearAll();
  res.json({ message: 'Todos los logs han sido eliminados' });
});

module.exports = router;
