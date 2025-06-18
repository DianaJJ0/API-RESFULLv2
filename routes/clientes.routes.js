const express = require('express');
const router = express.Router();

const clientesController = require('../controller/clientes.controller');

// Rutas para clientes
router.get('/', clientesController.obtenerClientes); // Obtener todos los clientes
router.get('/:documento', clientesController.obtenerClientePorDocumento); // Obtener cliente por documento
router.post('/', clientesController.crearCliente); // Crear un nuevo cliente
router.put('/:documento', clientesController.actualizarCliente); // Actualizar cliente por documento
router.delete('/:documento', clientesController.eliminarCliente); // Eliminar cliente por documento

module.exports = router;