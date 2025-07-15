const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const carritoController = require('../controllers/carrito.controller');

router.use(auth); // protege todas las rutas

router.get('/', carritoController.obtenerCarrito);
router.post('/', carritoController.agregarAlCarrito);
router.delete('/:id', carritoController.eliminarDelCarrito);

module.exports = router;
