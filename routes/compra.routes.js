const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const compraController = require('../controllers/compra.controller');

router.post('/', auth, compraController.finalizarCompra);

module.exports = router;
