const express = require('express');
const router = express.Router();
const controller = require('../controllers/productos.controller');

router.get('/', controller.listarProductos);

module.exports = router;
