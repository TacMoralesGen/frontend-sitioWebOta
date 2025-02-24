const express = require('express');
const morgan = require('morgan'); // middleware permite ejecutar una funcion, antes de ejecutar cualquier otra cosa
const app = express();
const cors = require('cors');
const { router } = require("../routes/index.routes"); // Rutas

// Función middleware de tercero
app.use(morgan('dev')); // Entrega a través de la consola todas las peticiones que se realizaron
app.use(express.json()); // Permite parsear el cuerpo de las solicitudes a JSON
app.use(cors());
app.disable("etag");
// Función para permitir CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permitir todas las conexiones
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
    res.send("API funcionando correctamente");
});


// Usar las rutas importadas
app.use("/api", router); // Redirige las rutas a la lógica que se encuentra en `routes/reserva.routes`

module.exports = app; // Exporta la aplicación para usarla en otro archivo