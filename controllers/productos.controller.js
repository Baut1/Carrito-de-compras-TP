const productosModel = require('../models/productos.model');

function listarProductos (req, res) {
  try {
    const productos = productosModel.getAll();
    res.render('productos/index', { productos });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener productos');
  }
};

module.exports = {
  listarProductos
};