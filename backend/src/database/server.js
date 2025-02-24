const mongoose = require("mongoose"); // Importamos Mongoose para interactuar con MongoDB

// Función asincrónica para conectar la base de datos
const dbConnection = async () => {
  try {
    // Intentamos conectar a la base de datos usando la URL de MongoDB
    await mongoose.connect("mongodb://localhost:27017/back-end-17");

    console.log("Conexión a la base de datos exitosa") ;

  } catch (error) {
    console.error("Error al conectar la base de datos:", error.message);
    process.exit(1); // Finaliza el proceso si la conexión falla
  }
};

// Exportamos la función para poder usarla en otros archivos
module.exports = { dbConnection };