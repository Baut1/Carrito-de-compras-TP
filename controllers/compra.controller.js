const carritoModel = require('../models/carrito.model');

function finalizarCompra (req, res) {
  const userId = req.user.id;

  const total = carritoModel.getTotalByUserId(userId);
  if (total === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }

  carritoModel.clearByUserId(userId);

  res.json({
    message: 'Compra realizada con éxito',
    total
  });
};

module.exports = {
  finalizarCompra
};