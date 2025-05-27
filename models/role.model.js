const db = require('../config/db');
const chalk = require('chalk');

function getAll() {
  const roles = db.prepare('SELECT * FROM roles').all();
  console.log(chalk.blue(`[DB] ${roles.length} roles encontrados`));
  return roles;
}

function getById(id) {
  const role = db.prepare('SELECT * FROM roles WHERE id = ?').get(id);
  console.log(role ? chalk.blue(`[DB] Rol ID ${id} encontrado`) : chalk.yellow(`[DB] Rol ID ${id} no encontrado`));
  return role;
}

/*
Convencional:
if (role) {
  console.log(chalk.blue(`[DB] Rol ID ${id} encontrado`));
} else {
  console.log(chalk.yellow(`[DB] Rol ID ${id} no encontrado`));
}

Operador ternario:
condición ? expresión_si_true : expresión_si_false;
*/

function create({ name }) {
  if (!name || name.length < 3) throw new Error('Nombre del rol inválido');
  const result = db.prepare('INSERT INTO roles (name) VALUES (?)').run(name);
  console.log(chalk.green(`[DB] Rol creado con ID ${result.lastInsertRowid}`));
  return result;
}

function update(id, { name }) {
  if (!name || name.length < 3) throw new Error('Nombre del rol inválido');
  const result = db.prepare('UPDATE roles SET name = ? WHERE id = ?').run(name, id);
  console.log(chalk.cyan(`[DB] Rol ID ${id} actualizado (${result.changes} cambio/s)`));
  return result;
}

function remove(id) {
  const result = db.prepare('DELETE FROM roles WHERE id = ?').run(id);
  console.log(chalk.red(`[DB] Rol ID ${id} eliminado (${result.changes} cambio/s)`));
  return result;
}

function getAllPermisos () {
  const result = db.prepare('SELECT * FROM permisos').all();

  return result;
}

function getPermisosByRoleId (roleId) {
  return db.prepare('SELECT permiso_id FROM rol_permiso WHERE rol_id = ?').all(roleId)
}

function getPermisosConNombreByRoleId (roleId) {
  return db.prepare(`
    SELECT permisos.id, permisos.nombre
    FROM permisos
    JOIN rol_permiso ON permisos.id = rol_permiso.permiso_id
    WHERE rol_permiso.rol_id = ?
  `).all(roleId)
}

function setPermisosForRole (roleId, permisoIds) {
  const borrar = db.prepare('DELETE FROM rol_permiso WHERE rol_id = ?')
  borrar.run(roleId)

  const insertar = db.prepare('INSERT INTO rol_permiso (rol_id, permiso_id) VALUES (?, ?)')
  permisoIds.forEach(id => {
    insertar.run(roleId, id)
  })
}

module.exports = { getAll, getById, create, update, remove, getAllPermisos, getPermisosByRoleId, getPermisosConNombreByRoleId, setPermisosForRole};