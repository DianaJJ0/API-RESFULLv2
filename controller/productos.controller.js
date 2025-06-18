const modeloProducto = require('../models/productos.model');

// GET - Obtener todos los productos
const getListarProductos = async (req, res) => {
    try {
        const productos = await modeloProducto.find();
        res.status(200).json(productos);
    } catch (err) {
        console.error("Error al obtener los productos:", err);
        res.status(500).json({ 'mensaje': "Error al obtener los productos" });
    }
};

// GET - Obtener producto por referencia
const getProductoReferencia = async (req, res) => {
    let productoEncontrado = await modeloProducto.findOne({ referencia: req.params.ref });
    if (productoEncontrado) {
        res.status(200).json(productoEncontrado);
    } else {
        res.status(404).json({ "error": 'No se encontró el producto' });
    }
};

// POST - Crear nuevo producto
const nuevoProducto = async (req, res) => {
    try {
        const nuevoProductoData = {
            referencia: req.body.referenciaProducto,
            nombre: req.body.nombreProducto,
            descripcion: req.body.descripcionProducto,
            precio: req.body.precioProducto,
            stock: req.body.stockProducto,
            imagen: req.body.imagenProducto,
            habilitado: true
        };

        const insercion = await modeloProducto.create(nuevoProductoData);
        res.status(201).json(insercion);
    } catch (err) {
        console.error('Error al crear el producto:', err.message);
        res.status(400).json({ mensaje: 'Error al crear el producto', error: err.message });
    }
};

// PUT - Actualizar producto
const actualizarProducto = async (req, res) => {
    const datosActualizados = {
        referencia: req.params.ref,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio: req.body.precioProducto,
        stock: req.body.stockProducto,
        imagen: req.body.imagenProducto,
        habilitado: true,
    };

    try {
        const actualizado = await modeloProducto.findOneAndUpdate(
            { referencia: req.params.ref },
            datosActualizados,
            { new: true }
        );
        if (actualizado) {
            res.status(200).json({ 'mensaje': "Actualización exitosa", producto: actualizado });
        } else {
            res.status(404).json({ 'mensaje': "Producto no encontrado" });
        }
    } catch (err) {
        console.error("Error al actualizar el producto:", err);
        res.status(400).json({ 'mensaje': "Error al actualizar el producto" });
    }
};

// DELETE - Eliminar producto
const eliminarProducto = async (req, res) => {
    const eliminacion = await modeloProducto.findOneAndDelete({ referencia: req.params.ref });
    if (eliminacion) {
        res.status(200).json({ "mensaje": "Producto eliminado exitosamente" });
    } else {
        res.status(404).json({ "mensaje": "Producto no encontrado" });
    }
};

module.exports = {
    getListarProductos,
    getProductoReferencia,
    nuevoProducto,
    actualizarProducto,
    eliminarProducto
};