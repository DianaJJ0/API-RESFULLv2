const express = require('express');
const router = express.Router();
const productosController = require('../controller/productos.controller');

// Rutas de productos
router.get('/', productosController.getListarProductos);
router.get('/:ref', productosController.getProductoReferencia);
router.post('/', productosController.nuevoProducto);
router.put('/:ref', productosController.actualizarProducto);
router.delete('/:ref', productosController.eliminarProducto);

module.exports = router;