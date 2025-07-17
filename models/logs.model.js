const db = require('../config/db');

function registrar ({ user_id, endpoint, metodo, estado, mensaje }) {
  db.prepare(`
    INSERT INTO logs (user_id, endpoint, metodo, estado, mensaje)
    VALUES (?, ?, ?, ?, ?)
  `).run(user_id, endpoint, metodo, estado, mensaje);
};

function getAll () {
  return db.prepare(`
    SELECT logs.*, users.email
    FROM logs
    LEFT JOIN users ON logs.user_id = users.id
    ORDER BY timestamp DESC
  `).all();
};

function clearAll () {
  db.prepare('DELETE FROM logs').run();
};

module.exports = {
    registrar,
    getAll,
    clearAll
};
