# Carrito de compras

Proyecto backend para la gestión de usuarios, roles, permisos y operaciones de carrito de compras.  
Desarrollado con Node.js, Express y SQLite.

## Funcionalidades principales

### Usuarios y roles
- Alta, baja y modificación de usuarios (`/users`)
- Asignación de roles a cada usuario
- Vista de los permisos heredados desde el rol (`/users/:id`)

### Roles y permisos
- ABM de roles (`/roles`)
- ABM de permisos (`/permisos`)
- Asignación de permisos a roles desde `/roles/:id/edit`
- Visualización de permisos asignados a un rol

### Sistema de autenticación
- Registro con email, contraseña y `role_id`
- Login con persistencia de sesión usando JWT
- Protección de rutas según si hay sesión válida
- Validación de rol para acceso a ciertas rutas

### Productos (público)
- `GET /api/productos`: devuelve todos los productos disponibles
- La base de datos ya incluye productos de ejemplo, también se pueden agregar con una petición `POST`

### Carrito de compras
Rutas autenticadas:
- `GET /api/carrito`: muestra el carrito del usuario logueado
- `POST /api/carrito`: agrega un producto al carrito
- `DELETE /api/carrito/:id`: elimina un producto del carrito
- `POST /api/compra`: finaliza la compra y vacía el carrito

### Logs
- Todas las peticiones autenticadas quedan registradas
- La tabla `logs` guarda: timestamp, user_id, endpoint, método, estado, mensaje
- `GET /api/logs`: solo accesible por admin
- `DELETE /api/logs`: elimina todos los logs (requiere ser admin)

---

## Cómo probar (ejemplos)

### Registro de usuario
```json
POST /auth/register
{
  "email": "admin@admin.com",
  "password": "1234",
}
```
### Login
```json
POST /auth/login
{
  "email": "admin@admin.com",
  "password": "1234"
}
```
Devuelve un token. Usar ese token en los headers como:

Authorization: Bearer (token)

### Carrito (requiere estar autenticado)
```json
GET /carrito
{
  "user_id": 2,
}
```
Devuelve:
```json
[
  {
    "id": 3,
    "nombre": "Filtro de papel",
    "precio": 4200,
    "cantidad": 1
  },
  {
    "id": 4,
    "nombre": "Leche",
    "precio": 1500,
    "cantidad": 2
  }
]
```
```json
POST /carrito
{
  "user_id": 2,
  "producto_id": 1,
  "cantidad": 3
}
```
### Compra (requiere estar autenticado)
```json
POST /compra
{
  "user_id": 2,
}
```
Devuelve:
```json
{
  "message": "Compra realizada con éxito",
  "total": 93600
}
```

### Logs (requiere estar autenticado y tener el rol "admin")
```json
GET /logs
```
Devuelve:
```json
...
{
    "id": 8,
    "timestamp": "2025-07-17 18:46:56",
    "user_id": 1,
    "endpoint": "/carrito",
    "metodo": "GET",
    "estado": 200,
    "mensaje": "Peticion GET hacia /carrito con status: 200",
    "email": "admin@admin.com"
},
...
```

## Setup del proyecto

1. Clonar el repositorio:
    ```json
    git clone https://github.com/Baut1/Carrito-de-compras-TP.git
    cd Carrito-de-compras-TP
    ```
2. Instalar dependencias:
    ```json
    npm install
    ```
3. Iniciar el servidor:
    ```json
    node app.js
    ```

## ¡Importante!

Crear un archivo .env en la raíz principal del proyecto, con alguna clave `JWT_SECRET` para la enrciptación de las contraseñas.

Por ej:
```json
JWT_SECRET=clave
```
o idealmente algo menos obvio como:
```json
JWT_SECRET=aa3a3e47bae4f0c6be87ac2abb4796a094240cc74681e138868d13489892ddd3
json
