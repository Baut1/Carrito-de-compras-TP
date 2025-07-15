const productosModel = require('../models/productos.model');

function listarProductos (req, res) {
  const productos = productosModel.getAll();
  res.json(productos);
};

module.exports = {
  listarProductos
};