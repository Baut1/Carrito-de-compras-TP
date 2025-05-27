// controllers/role.controller.js
const Role = require('../models/role.model');

function getAllRoles(req, res) {
  try {
    const roles = Role.getAll();
    res.render('roles/index', { roles });
  } catch (err) {
    console.error('[Error]', err.message);
    res.status(500).send('Error al obtener roles');
  }
}

function getRoleById(req, res) {
    try {
      const role = Role.getById(req.params.id);
      if (!role) return res.status(404).send('Rol no encontrado');

      const permisos = Role.getPermisosConNombreByRoleId(role.id)

      res.render('roles/detail', { role, permisos });
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(500).send('Error al buscar el rol');
    }
  }
  
  function renderNewRoleForm(req, res) {
    res.render('roles/new');
  }
  
  function renderEditRoleForm(req, res) {
    try {
      const role = Role.getById(req.params.id);
      if (!role) return res.status(404).send('Rol no encontrado');

      const todosLosPermisos = Role.getAllPermisos();
      const permisosDelRol = Role.getPermisosByRoleId(role.id).map(p => p.permiso_id);

      res.render('roles/edit', { role, permisos: todosLosPermisos, permisosAsignados: permisosDelRol });
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(500).send('Error al cargar formulario');
    }
  }
  
  function createRole(req, res) {
    try {
      Role.create(req.body);
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(400).send('Error al crear: ' + err.message);
    }
  }
  
  function updateRole(req, res) {
    const permisosSeleccionados = req.body.permisos || []

    const permisos = Array.isArray(permisosSeleccionados)
    ? permisosSeleccionados.map(Number)
    : [Number(permisosSeleccionados)]

    try {
      Role.update(req.params.id, req.body);
      Role.setPermisosForRole(req.params.id, permisos)
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(400).send('Error al actualizar: ' + err.message);
    }
  }
  
  function deleteRole(req, res) {
    try {
      Role.remove(req.params.id);
      res.redirect('/roles');
    } catch (err) {
      console.error('[Error]', err.message);
      res.status(500).send('Error al eliminar');
    }
  }
  
  module.exports = {
    getAllRoles,
    getRoleById,
    renderNewRoleForm,
    renderEditRoleForm,
    createRole,
    updateRole,
    deleteRole
  };