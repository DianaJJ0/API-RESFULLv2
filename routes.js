const express = require('express');
const router = express.Router();

// Importar rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');
const clientesRoutes = require('./routes/clientes.routes');

// Rutas
router.use('/usuarios', usuariosRoutes);
router.use('/clientes', clientesRoutes);
router.use('/productos', productosRoutes);

module.exports = router;