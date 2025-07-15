const Database = require('better-sqlite3');
const db = new Database('usuarios.db');

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );
`);

db.prepare(`
  CREATE TABLE IF NOT EXISTS permisos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT UNIQUE NOT NULL
  )
`).run()

db.prepare(`
  CREATE TABLE IF NOT EXISTS rol_permiso (
    rol_id INTEGER,
    permiso_id INTEGER,
    PRIMARY KEY (rol_id, permiso_id),
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE
  )
`).run()

// Agregar columna password_hash a la tabla users si no existe
try {
  db.prepare('ALTER TABLE users ADD COLUMN password_hash TEXT').run();
} catch (e) {
}

// Crear tabla productos si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS productos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL
  )
`).run()

const cantidad = db.prepare('SELECT COUNT(*) AS total FROM productos').get().total;
if (cantidad === 0) {
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Café en grano', 1500)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Taza térmica', 1200)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Filtro de papel', 300)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Leche', 900)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Galletas', 500)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Cafetera italiana', 5000)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Termo de acero', 3500)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Chocolate para taza', 1100)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Azúcar', 400)`).run();
}

// Crear tabla carrito si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS carrito (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
  )
`).run()

// Crear tabla logs si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    endpoint TEXT,
    metodo TEXT,
    estado INTEGER,
    mensaje TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`).run()


module.exports = db;