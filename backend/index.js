const app = require("./src/app/app"); // Importa la configuración de la app
const port = 3000;
const { dbConnection } = require("./src/database/server"); // Conexión a la base de datos

// Conectamos a la base de datos
dbConnection();

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});