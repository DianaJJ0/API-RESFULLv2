require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); // Configura express para que pueda recibir datos en formato URL-encoded
app.use(express.json()); // esto Configura express para que pueda recibir datos en formato JSON


app.use('/v2', routes); // la ruta base para el enrutador

// Servidor
app.listen(process.env.PORT || 9090, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT || 9090}`);
});
