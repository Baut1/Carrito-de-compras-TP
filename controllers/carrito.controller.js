const carritoModel = require('../models/carrito.model');

function obtenerCarrito (req, res) {
  const userId = req.user.id;
  const items = carritoModel.getByUserId(userId);
  res.json(items);
};

function agregarAlCarrito (req, res) {
  const userId = req.user.id;
  const { producto_id, cantidad } = req.body;

  if (!producto_id || !cantidad) {
    return res.status(400).json({ error: 'faltan datos' });
  }

  carritoModel.add(userId, producto_id, cantidad);
  res.status(201).json({ message: 'prod. agregado al carrito' });
};

function eliminarDelCarrito (req, res) {
  const id = req.params.id;
  carritoModel.remove(id);
  res.json({ message: 'prod. eliminado del carrito' });
};

module.exports = {
    obtenerCarrito,
    agregarAlCarrito,
    eliminarDelCarrito
};
