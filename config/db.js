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

// Insertar roles por defecto si la tabla está vacía
const rolesCount = db.prepare('SELECT COUNT(*) AS total FROM roles').get().total;
if (rolesCount === 0) {
  db.prepare('INSERT INTO roles (name) VALUES (?)').run('admin');
  db.prepare('INSERT INTO roles (name) VALUES (?)').run('cliente');
}

// Tabla de permisos
db.prepare(`
  CREATE TABLE IF NOT EXISTS permisos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT UNIQUE NOT NULL
  )
`).run()

// Insertar permiso por defecto si la tabla está vacía
const permisosCount = db.prepare('SELECT COUNT(*) AS total FROM permisos').get().total;
if (permisosCount === 0) {
  db.prepare('INSERT INTO permisos (nombre) VALUES (?)').run('agregar permisos');
}

// Crear tabla intermedia rol_permiso si no existe
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
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Café en grano', 27000)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Filtro de papel', 4200)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Leche', 1500)`).run();
  db.prepare(`INSERT INTO productos (nombre, precio) VALUES ('Galletas', 800)`).run();
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