const db = require('../config/db');

function getByUserId (userId) {
  return db.prepare(`
    SELECT carrito.id, productos.nombre, productos.precio, carrito.cantidad
    FROM carrito
    JOIN productos ON carrito.producto_id = productos.id
    WHERE carrito.user_id = ?
  `).all(userId);
};

function add (userId, productoId, cantidad) {
  return db.prepare(`
    INSERT INTO carrito (user_id, producto_id, cantidad)
    VALUES (?, ?, ?)
  `).run(userId, productoId, cantidad);
};

function remove (carritoId) {
  return db.prepare('DELETE FROM carrito WHERE id = ?').run(carritoId);
};

function getTotalByUserId (userId) {
  return db.prepare(`
    SELECT SUM(productos.precio * carrito.cantidad) AS total
    FROM carrito
    JOIN productos ON carrito.producto_id = productos.id
    WHERE carrito.user_id = ?
  `).get(userId).total || 0;
};

function clearByUserId (userId) {
  return db.prepare('DELETE FROM carrito WHERE user_id = ?').run(userId);
};


module.exports = {
    getByUserId,
    add,
    remove,
    getTotalByUserId,
    clearByUserId
};