const Contacto = require("../models/contacto.model"); // Importamos el modelo de Contacto

// Función para crear un nuevo contacto
const createNewContact = async (req, res) => {
  try {
    // Creamos el contacto con los datos recibidos en el cuerpo de la solicitud
    const nuevoContacto = await Contacto.create(req.body);

    // Si se crea correctamente, enviamos una respuesta con estado 201 (creado)
    res.status(201).json({
      message: "Contacto creado exitosamente",
      contacto: nuevoContacto, // Enviamos el contacto creado como respuesta
    });

  } catch (error) {
    // Si hay un error de validación de Mongoose (ej. falta un campo requerido)
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        message: "Datos inválidos", // Mensaje de error
        error: error.message // Detalles del error de validación
      });
    }

    // Si es otro tipo de error (problema en el servidor, por ejemplo)
    console.error("Error en el servidor:", error); // Mostramos el error en la consola
    res.status(500).json({ 
      message: "Error interno del servidor" // Enviamos un error 500
    });
  }
};

// Función para obtener todos los contactos
const getAllContacts = async (req, res) => {
  try {
    // Obtenemos todos los contactos desde la base de datos
    const contactos = await Contacto.find();

    // Si se obtienen correctamente, enviamos la lista de contactos
    res.status(200).json({
      message: "Lista de contactos obtenida",
      contactos: contactos,
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// Exportamos las funciones para poder usarlas en las rutas
module.exports = { createNewContact, getAllContacts };
