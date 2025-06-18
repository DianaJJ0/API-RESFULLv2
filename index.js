const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Conexión a la base de datos
require('./config/database');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const clientesRoutes = require('./routes/clientes.routes');

// Usar rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/clientes', clientesRoutes);

// Puerto
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});