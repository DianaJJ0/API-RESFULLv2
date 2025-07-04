const mongoose = require('mongoose');
require('../config/database');

const schemaProducto = new mongoose.Schema({
    referencia: {
        type: String,
        required: [true, 'La referencia es obligatoria'],
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'Asignar un nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    precio: {
        type: Number,
        default: 0,
        min: [0, 'El precio mínimo es cero']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock mínimo es cero']
    },
    imagen: {
        type: String,
        required: [false, 'La imagen no es obligatoria']
    },
    habilitado: {
        type: Boolean,
        default: true
    }
}, {
    // Configuración de opciones del esquema
    timestamps: true,
    versionKey: false
});

const Producto = mongoose.model('Producto', schemaProducto);
module.exports = Producto;
