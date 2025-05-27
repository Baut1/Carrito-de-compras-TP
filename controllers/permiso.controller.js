const Permiso = require('../models/permiso.model')

function listPermisos (req, res) {
  try {
  const permisos = Permiso.getAll()
  res.render('permisos/index', { permisos })
  } catch (err) {
    res.status(500).send('Error al obtener permisos');
  }
}

function renderNewPermisoForm (req, res) {
  res.render('permisos/new')
}

function createPermiso (req, res) {
  try {
    Permiso.create(req.body.nombre)
    res.redirect('/permisos')
  } catch (err) {
    res.render('permisos/error', { message: 'Nombre duplicado o inválido', error: err })
  }
}

function renderEditPermsoForm (req, res) {
  const permiso = Permiso.getById(req.params.id)
  if (!permiso) return res.render('permisos/error', { message: 'Permiso no encontrado', error: {} })
  res.render('permisos/edit', { permiso })
}

function updatePermiso (req, res) {
  try {
    Permiso.update(req.params.id, req.body.nombre)
    res.redirect('/permisos')
  } catch (err) {
    res.render('permisos/error', { message: 'Error al actualizar', error: err })
  }
}

function removePermiso (req, res) {
  try {
    Permiso.remove(req.params.id)
    res.redirect('/permisos')
  } catch (err) {
    res.status(500).send('Error al eliminar');
  }
  
}

module.exports = {
  listPermisos,
  renderNewPermisoForm,
  createPermiso,
  renderEditPermsoForm,
  updatePermiso,
  removePermiso
};