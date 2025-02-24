const API_URL = "http://localhost:3000/api/contacto"; // Asegúrate de que este puerto sea el correcto para tu backend

// Función para crear un nuevo contacto (POST)
const createContact = async (formData) => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "POST", // Método HTTP: POST (para crear recursos)
            headers: {
                "Content-Type": "application/json", // Se indica que los datos que se envían son en formato JSON
            },
            body: JSON.stringify(formData), // Convertimos el objeto de datos del formulario a una cadena JSON
        });

        const data = await response.json(); // Parseamos la respuesta del servidor

        if (!response.ok) throw new Error(data.message || "Error al crear el contacto");

        return data; // Si todo sale bien, retornamos los datos del nuevo contacto creado

    } catch (error) {
        console.error("Error al enviar el contacto:", error);
        throw error; // Lanzamos el error para que sea manejado en el componente
    }
};

export { createContact };