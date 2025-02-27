const PORT = "3000"
const URL_BASE = `http://localhost:${PORT}/api` // Asegúrate de que este puerto sea el correcto para tu backend

const ENDPOINT_POST_CABANA = "/cabin"; 
const ENDPOINT_PATCH_CABANA = "/cabin"; 
const ENDPOINT_GET_CABANA = `/cabins`;
const ENDPOINT_POST_RESERVA = "/reservation"; 
const ENDPOINT_GET_RESERVA = `/reservations`;

const URL_PATCH_CABANA = `${URL_BASE}${ENDPOINT_PATCH_CABANA}`; 
const URL_POST_CABANA = `${URL_BASE}${ENDPOINT_POST_CABANA}`; 
const URL_GET_CABANA = `${URL_BASE}${ENDPOINT_GET_CABANA}`; 
const URL_POST_RESERVA = `${URL_BASE}${ENDPOINT_POST_RESERVA}`; 
const URL_GET_RESERVA = `${URL_BASE}${ENDPOINT_GET_RESERVA}`; 


const patchData = async (apiUrl, data) => {
	try {
		const response = await fetch(`${apiUrl}`, {
			method: "PATCH", // Método HTTP: PATCH (para actualizar recursos)
			headers: { "Content-Type": "application/json", }, // Se indica que los datos que se envían son en formato JSON
			body: JSON.stringify(data), // Convertimos el objeto de datos del formulario a una cadena JSON
		});
		const dataFinal = await response.json(); // Parseamos la respuesta del servidor
		if (!response.ok) throw new Error(dataFinal.message || `Error al actualizar en el servidor la data: ${dataFinal}`);
		return dataFinal; // Si todo sale bien, retornamos los datos del nuevo contacto creado
	} catch (error) {
		console.error("Error al enviar la data:", error);
		throw error; // Lanzamos el error para que sea manejado en el componente
	}
};

// Función para enviar data (POST)
const postData = async (apiUrl, data) => {
	try {
		const response = await fetch(`${apiUrl}`, {
			method: "POST", // Método HTTP: POST (para crear recursos)
			headers: { "Content-Type": "application/json", }, // Se indica que los datos que se envían son en formato JSON
			body: JSON.stringify(data), // Convertimos el objeto de datos del formulario a una cadena JSON
		});
		const dataFinal = await response.json(); // Parseamos la respuesta del servidor
		if (!response.ok) throw new Error(dataFinal.message || `Error al guardar en el servidor la data: ${dataFinal}`);
		return dataFinal; // Si todo sale bien, retornamos los datos del nuevo contacto creado
	} catch (error) {
		console.error("Error al enviar la data:", error);
		throw error; // Lanzamos el error para que sea manejado en el componente
	}
};

// Función para obtener data (GET)
const getData = async (apiUrl) => {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json(); // Parseamos la respuesta del servidor
		if (!response.ok) {
			throw new Error(data.message || `Error al guardar en el servidor la data: ${data}`);
		}
		return data; // Si todo sale bien, retornamos los datos del nuevo contacto creado
	} catch (error) {
		console.error("Error al enviar la data:", error);
		throw error; // Lanzamos el error para que sea manejado en el componente
	}
};

const createCabana = async data => await postData(URL_POST_CABANA, data)
const updateCabana = async data => await patchData(URL_PATCH_CABANA, data)
const getCabanas = async () => await getData(URL_GET_CABANA)

const createReservation = async data => await postData(URL_POST_RESERVA, data)

const getReservations = async () => await getData(URL_GET_RESERVA)

export { createReservation, createCabana, getReservations, getCabanas, updateCabana };
