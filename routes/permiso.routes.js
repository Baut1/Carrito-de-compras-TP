const express = require('express')
const router = express.Router()
const permisoController = require('../controllers/permiso.controller')

router.get('/', permisoController.listPermisos)
router.get('/new', permisoController.renderNewPermisoForm)
router.post('/new', permisoController.createPermiso)
router.get('/:id/edit', permisoController.renderEditPermsoForm)
router.post('/:id/edit', permisoController.updatePermiso)
router.post('/:id/delete', permisoController.removePermiso)

module.exports = router
