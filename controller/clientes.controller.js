const modeloCliente = require('../models/clientes.model');

/*
 * GET para obtener todos los clientes registrados en la base de datos.
 */
const obtenerClientes = async (req, res) => {
    try {
        // Busca todos los documentos en la colección de clientes
        const listaClientes = await modeloCliente.find();
        // Devuelve la lista de clientes en formato JSON y código 200 OK
        res.status(200).json(listaClientes);
    } catch (err) {
        // Si ocurre un error, se captura aquí y se devuelve un mensaje de error con código 500
        console.error("Error al obtener clientes:", err);
        res.status(500).json({ mensaje: "Error al obtener clientes", error: err.message });
    }
};

/**
 * GET para obtener un cliente específico según su documento de identidad. */
const obtenerClientePorDocumento = async (req, res) => {
    try {
        // Busca un cliente cuyo campo 'documento' coincida con el parámetro recibido en la URL
        const cliente = await modeloCliente.findOne({ documento: req.params.documento });
        if (cliente) {
            // Si el cliente existe, lo retorna en formato JSON y código 200 OK
            res.status(200).json(cliente);
        } else {
            // Si no se encuentra, retorna un mensaje de error con código 404
            res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
    } catch (err) {
        // Captura y muestra cualquier error inesperado
        console.error("Error al obtener el cliente:", err);
        res.status(500).json({ mensaje: "Error al obtener el cliente", error: err.message });
    }
};

/* POST para crear un nuevo cliente en la base de datos. */
const crearCliente = async (req, res) => {
    // Crea una nueva instancia del modeloCliente usando los datos enviados por el usuario
    const nuevoCliente = new modeloCliente({
        documento: req.body.documento,           
        correo: req.body.correo,                 
        telefono: req.body.telefono,            
        direccion: req.body.direccion,           
        fechaNacimiento: req.body.fechaNacimiento
    });
    try {
        // Guarda el nuevo cliente en la base de datos
        const clienteGuardado = await nuevoCliente.save();
        // Si el cliente se guarda correctamente, responde con código 201 creado
        res.status(201).json({ mensaje: "Cliente creado exitosamente", cliente: clienteGuardado });
    } catch (err) {
        // Si ocurre un error al guardar el cliente, responde con código 400 e información del error
        console.error("Error al crear el cliente:", err);
        res.status(400).json({ mensaje: "Error al crear el cliente", error: err.message });
    }
};

/**
 * PUT para actualizar la información de un cliente existente.
 * Espera los nuevos datos del cliente en el cuerpo de la petición (req.body) */

const actualizarCliente = async (req, res) => {
    // Obtiene los datos a actualizar desde el cuerpo de la petición
    const datosActualizados = req.body;
    try {
        // Busca y actualiza el cliente por su documento, devolviendo el cliente actualizado
        const clienteActualizado = await modeloCliente.findOneAndUpdate(
            { documento: req.params.documento }, // Filtro de búsqueda
            datosActualizados,   // Retorna el documento actualizado                
            { new: true }                       
        );
        if (clienteActualizado) {
            // Si se actualiza correctamente, responde con el cliente actualizado y código 200
            res.status(200).json({ mensaje: "Cliente actualizado exitosamente", cliente: clienteActualizado });
        } else {
            // Si no encuentra el cliente, responde con código 404
            res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
    } catch (err) {
        // Si ocurre un error al actualizar, responde con código 400 e información del error
        console.error("Error al actualizar el cliente:", err);
        res.status(400).json({ mensaje: "Error al actualizar el cliente", error: err.message });
    }
};

/*
 * DELETE para eliminar un cliente de la base de datos.*/

const eliminarCliente = async (req, res) => {
    try {
        // Busca y elimina el cliente cuyo documento coincida con el parámetro recibido
        const clienteEliminado = await modeloCliente.findOneAndDelete({ documento: req.params.documento });
        if (clienteEliminado) {
            // Si se elimina correctamente, responde con código 200 y mensaje de éxito
            res.status(200).json({ mensaje: "Cliente eliminado exitosamente" });
        } else {
            // Si no encuentra el cliente, responde con código 404
            res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
    } catch (err) {
        // Si ocurre un error al eliminar, responde con código 500 e información del error
        console.error("Error al eliminar el cliente:", err);
        res.status(500).json({ mensaje: "Error al eliminar el cliente", error: err.message });
    }
};

// Exporta los controladores para ser usados en el enrutador de clientes
module.exports = {
    obtenerClientes,
    obtenerClientePorDocumento,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};