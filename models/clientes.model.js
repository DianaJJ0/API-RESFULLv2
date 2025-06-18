const mongoose = require('mongoose');

// Definir el esquema del cliente
const clienteSchema = new mongoose.Schema({
    documento: {
        type: String,
        required: true,
        unique: true
    },
    nombreCompleto: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String
    },
    direccion: {
        type: String
    },
    fechaNacimiento: {
        type: Date
    }
}, {
    timestamps: true
});

// Exportar el modelo
module.exports = mongoose.model('Cliente', clienteSchema);