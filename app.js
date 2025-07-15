const express = require('express');
const path = require('path');
const morgan = require('morgan');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const permisoRoutes = require('./routes/permiso.routes');
const authRoutes = require('./routes/auth.routes');
const productosRoutes = require('./routes/productos.routes');
const carritoRoutes = require('./routes/carrito.routes');
const compraRoutes = require('./routes/compra.routes');
const logsRoutes = require('./routes/logs.routes');
const createError = require('http-errors');
const logsMiddleware = require('./middlewares/logs.middleware');
require('dotenv').config();

// Instancia de la app
const app = express();

// Configuracion de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuracion de entorno 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuracion de rutas
app.use(logsMiddleware);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/permisos', permisoRoutes)
app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);
app.use('/carrito', carritoRoutes);
app.use('/compra', compraRoutes);
app.use('/logs', logsRoutes);

// Configuracion de redireccion (por defecto)
app.get('/', (req, res) => {
  res.redirect('/users');
});

// Middleware de error 404
app.use((req, res, next) => {
  next(createError(404, 'Ruta no encontrada'));
});

// Manejador de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('general_error', { message: err.message, error: app.get('env') === 'development' ? err : {} });
});

module.exports = app;