const db = require('../config/db');

function getAll () {
  return db.prepare('SELECT * FROM productos').all();
};

module.exports = {
  getAll
};