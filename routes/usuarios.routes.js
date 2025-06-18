const express = require('express');
const router = express.Router();

const usuariosController = require('../controller/usuarios.controller');

// Rutas de usuarios
router.get('/', usuariosController.obtenerUsuarios);
router.post('/', usuariosController.crearUsuario);
router.put('/:email', usuariosController.actualizarUsuario);
router.delete('/:email', usuariosController.eliminarUsuario);

module.exports = router;