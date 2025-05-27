const db = require('../config/db')

function getAll () {
  return db.prepare('SELECT * FROM permisos').all()
}

function getById (id) {
  return db.prepare('SELECT * FROM permisos WHERE id = ?').get(id)
}

function create (nombre) {
  return db.prepare('INSERT INTO permisos (nombre) VALUES (?)').run(nombre)
}

function update (id, nombre) {
  return db.prepare('UPDATE permisos SET nombre = ? WHERE id = ?').run(nombre, id)
}

function remove (id) {
  return db.prepare('DELETE FROM permisos WHERE id = ?').run(id)
}

module.exports = { getAll, getById, create, update, remove };
