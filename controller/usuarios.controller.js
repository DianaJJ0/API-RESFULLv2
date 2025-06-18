const modeloUsuario = require('../models/usuarios.model');

// GET - Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await modeloUsuario.find();
        res.json(listaUsuarios);
    } catch (err) {
        console.error("Error al obtener usuarios:", err);
        res.status(500).json({ 'mensaje': "Error al obtener usuarios", error: err.message });
    }
};

// POST - Crear nuevo usuario
const crearUsuario = async (req, res) => {
    // Validar que los campos requeridos
    const nuevoUsuario = new modeloUsuario({
        documento: req.body.documento, // Asegura que el campo 'documento' sea único
        nombreCompleto: req.body.nombreCompleto, 
        fechaNacimiento: req.body.fechaNacimiento, 
        correo: req.body.correo // Asegura que el campo 'correo' sea único
    });

    try { 
        const usuarioGuardado = await nuevoUsuario.save(); 
        // Si el usuario se guarda correctamente, envia una respuesta exitosa
        res.status(201).json({ 'mensaje': "Usuario creado exitosamente", usuario: usuarioGuardado });
    } catch (err) {
        // Si ocurre un error al guardar el usuario, envia una respuesta de error
        console.error("Error al guardar el usuario:", err);
        res.status(400).json({ 'mensaje': "Error al crear el usuario", error: err.message });
    }
};

// PUT - Actualizar usuario
const actualizarUsuario = async (req, res) => { 
    // Valida que los campos requeridos
    const datosEditados = req.body;
    try {
        const usuarioActualizado = await modeloUsuario.findOneAndUpdate(
            { correo: req.params.email },
            datosEditados,
            { new: true }
        );
        if (usuarioActualizado) { 
            // Si el usuario se actualiza correctamente, envia una respuesta exitosa
            res.status(200).json({ 'mensaje': "Usuario actualizado exitosamente", usuario: usuarioActualizado });
        } else {
            res.status(404).json({ 'mensaje': "Usuario no encontrado" });
        }
    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
        res.status(400).json({ 'mensaje': "Error al actualizar el usuario", error: err.message });
    }
};

// DELETE - Eliminar usuario
const eliminarUsuario = async (req, res) => { 
    // Valida que el correo del usuario a eliminar sea proporcionado
    try {
        const usuarioEliminado = await modeloUsuario.findOneAndDelete({ correo: req.params.email });
        if (usuarioEliminado) {
            res.status(200).json({ 'mensaje': "Usuario eliminado exitosamente" });
        } else {
            res.status(404).json({ 'mensaje': "Usuario no encontrado" });
        }
    } catch (err) {
        console.error("Error al eliminar el usuario:", err);
        res.status(500).json({ 'mensaje': "Error al eliminar el usuario", error: err.message });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
