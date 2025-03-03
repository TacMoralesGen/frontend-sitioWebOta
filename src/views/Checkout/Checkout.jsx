/* eslint-disable react/prop-types */

import "./Checkout.css";
import Header from "../../components/Header/Header";
import ReserveDetails from "../../components/ReserveDetails/ReserveDetails";
import ReserveResume from "../../components/ReserveResume/ReserveResume";
import imgTinyCabin from "../../assets/images/tinyCabin.jpg";
import imgCoupleRoom from "../../assets/images/coupleRoom.avif";
import Footer from "../../components/Footer/Footer";
import ContactInformationForm from "../../components/Contact-information-form/ContactInformationForm";
import TermsConditions from "../../components/Terms-conditions/TermsConditions";
import SectionMap from "../../components/Map/Map";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isSameDay, addDays } from "date-fns";
import { getTotalCheckout, getTotalReserve, getCabinByNumber } from "../../scripts/utils";

import { createReservation } from "../../../api";

const cabins = [
	{
		typeName: "Tiny Cabin",
		number: 201,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 3), new Date(2025, 1, 4), new Date(2025, 1, 6), new Date(2025, 1, 7), new Date(2025, 1, 8), new Date(2025, 1, 9), new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12)],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 202,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 6), new Date(2025, 1, 7), new Date(2025, 1, 8), new Date(2025, 1, 9), new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12), new Date(2025, 1, 13), new Date(2025, 1, 17), new Date(2025, 1, 18)],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 203,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12), new Date(2025, 1, 13)],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 204,
		statusCabin: "Mantencion",
		statusHotTub: "Disponible",
		reservedDates: [],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 205,
		statusCabin: "Mantencion",
		statusHotTub: "Disponible",
		reservedDates: [],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 206,
		statusCabin: "Mantencion",
		statusHotTub: "Disponible",
		reservedDates: [],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 207,
		statusCabin: "Mantencion",
		statusHotTub: "Disponible",
		reservedDates: [],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 208,
		statusCabin: "Mantencion",
		statusHotTub: "Disponible",
		reservedDates: [],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 209,
		statusCabin: "Mantencion",
		statusHotTub: "Disponible",
		reservedDates: [],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Tiny Cabin",
		number: 210,
		statusCabin: "Mantencion",
		statusHotTub: "Disponible",
		reservedDates: [],
		maxAdults: 2,
		maxChildren: 3,
		capacity: 4,
		priceHotTubPerInstance: 60_000,
		pricePerNight: 160_900,
		amenities: ["Cocina", "Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 25,
		bedType: "1 Cama Queen + 2 Literas niños",
		img: imgTinyCabin,
	},
	{
		typeName: "Couple Room",
		number: 101,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 102,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 11), new Date(2025, 1, 12), new Date(2025, 1, 13)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 103,
		statusCabin: "Disponible",
		statusHotTub: "Mantencion",
		reservedDates: [new Date(2025, 1, 11), new Date(2025, 1, 12), new Date(2025, 1, 13)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 104,
		statusCabin: "Disponible",
		statusHotTub: "Mantencion",
		reservedDates: [new Date(2025, 1, 11), new Date(2025, 1, 12), new Date(2025, 1, 13)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 105,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 11), new Date(2025, 1, 12), new Date(2025, 1, 13), new Date(2025, 1, 14), new Date(2025, 1, 15)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 106,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 9), new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 107,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 9), new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 108,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 109,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
	{
		typeName: "Couple Room",
		number: 110,
		statusCabin: "Disponible",
		statusHotTub: "Disponible",
		reservedDates: [new Date(2025, 1, 8), new Date(2025, 1, 9), new Date(2025, 1, 10), new Date(2025, 1, 11), new Date(2025, 1, 12), new Date(2025, 1, 13)],
		maxAdults: 2,
		maxChildren: 1,
		capacity: 2,
		priceHotTubPerInstance: 45_000,
		pricePerNight: 91_900,
		amenities: ["Aire Acondicionado", "Baño Privado", "Ducha", "Estacionamiento Gratuito", "Secador de pelo", "Tinaja Caliente (costo adicional por uso)", "Toallas"],
		size: 14,
		bedType: "1 Cama Queen",
		img: imgCoupleRoom,
	},
];
const cabinsTypes = (() => {
	const cabinSummary = new Map();
	cabins.forEach((cabin) => {
		if (!cabinSummary.get(cabin.typeName)) {
			cabinSummary.set(cabin.typeName, {
				idCabinType: cabin.idCabinType,
				typeName: cabin.typeName,
				maxAdults: cabin.maxAdults,
				maxChildrens: cabin.maxChildren,
				capacity: cabin.capacity,
				priceHotTubPerInstance: cabin.priceHotTubPerInstance,
				pricePerNight: cabin.pricePerNight,
				amenities: [...cabin.amenities],
				size: cabin.size,
				bedType: cabin.bedType,
				img: cabin.img,
			});
		}
	});
	return cabinSummary;
})();

const cabinsActive = cabins.filter((cabin) => cabin.statusCabin === "Disponible");

// OBJETO DE RESERVA INICIAL (Con los campos de contacto vacíos)
const initialReservation = {
	numReservation: 12,
	documentTypeClient: "RUT",
	documentNumberClient: "19.201.301-1",
	nameClient: "",
	countryOfResidence: "",
	phoneClient: "",
	emailClient: "",
	checkinDate: null,
	checkoutDate: null,
	statusReservation: "Pendiente",
	totalPrice: null,
	notes: "",
	reservationCabins: [],
};

// ----------------------------------------------------------------------------------
// FUNCIONES AUXILIARES
const getCabinsAvailableInRange = (reservationRange, cabins) => {
	const cabinsAvailable = [];
	for (const cabin of cabins) {
		const reservedDatesOfACabin = cabin.reservedDates;
		let isCabinAvailable = true;
		for (const reservedDateOfACabin of reservedDatesOfACabin) {
			if (reservationRange.some((reservationDate) => isSameDay(reservationDate, reservedDateOfACabin))) {
				isCabinAvailable = false;
				break;
			}
		}
		if (isCabinAvailable) {
			cabinsAvailable.push(cabin);
		}
	}
	return cabinsAvailable;
};

const getSpecificCabinsSelected = (cabinsAvailableInRange, qtyCabinsSelection) => {
	const cabinsSelection = [];
	for (let [keyCabinType, qtySelection] of qtyCabinsSelection) {
		if (qtySelection > 0) {
			const cabinsAvailableInRangeOfAType = cabinsAvailableInRange.filter((cabin) => cabin.typeName === keyCabinType);
			cabinsSelection.splice(cabinsSelection.length, 0, ...cabinsAvailableInRangeOfAType.splice(0, qtySelection));
		}
	}
	return cabinsSelection;
};

// ----------------------------------------------------------------------------------
// COMPONENTE CHECKOUT
const Checkout = () => {
	const navigate = useNavigate();
	// Recibimos los datos desde la ruta anterior
	const { reservationRange, qtyCabinsSelection } = useLocation().state;

	// Calculamos las cabañas disponibles en el rango
	const cabinsAvailableInRange = getCabinsAvailableInRange(reservationRange, cabinsActive);
	const specificCabinsSelected = getSpecificCabinsSelected(cabinsAvailableInRange, qtyCabinsSelection);
	const checkIn = reservationRange[0];
	const checkOut = addDays(reservationRange[reservationRange.length - 1], 1);
	const total = getTotalReserve(qtyCabinsSelection, cabinsTypes, reservationRange.length);

	// Inicializamos reservationCabins en el objeto de reserva
	const reservationCabinsInit = [];
	for (const cabin of specificCabinsSelected) {
		const cabinReservation = {
			cabinNumber: cabin.number,
			adults: 1,
			childrens: 0,
			mainGuest: "Falta capturar esto!",
			datesHotTub: [],
			priceCabin: cabin.pricePerNight * reservationRange.length,
			priceHotTub: 0,
		};
		reservationCabinsInit.push(cabinReservation);
	}
	initialReservation.reservationCabins = reservationCabinsInit;
	initialReservation.checkinDate = checkIn;
	initialReservation.checkoutDate = checkOut;
	initialReservation.totalPrice = total;

	// ESTADO PRINCIPAL DE LA RESERVA (INCLUYE DATOS DE CONTACTO)
	const [reservation, setReservation] = useState(initialReservation);

	// FUNCIONES PARA ACTUALIZAR SERVICIOS ADICIONALES
	const actualizarFechasTinajas = (cabinNumber, hotTubDates) => {
		const updatedReservation = { ...reservation };
		const arregloReservasCabanas = [...updatedReservation.reservationCabins];
		for (const reservaCabana of arregloReservasCabanas) {
			const index = arregloReservasCabanas.indexOf(reservaCabana);
			if (reservaCabana.cabinNumber === cabinNumber) {
				const cabina = getCabinByNumber(cabinNumber, cabinsActive);
				const priceHotTubPerInstance = cabina.priceHotTubPerInstance;
				reservaCabana.datesHotTub = hotTubDates;
				reservaCabana.priceHotTub = hotTubDates.length * priceHotTubPerInstance;
				arregloReservasCabanas[index] = reservaCabana;
				break;
			}
		}
		updatedReservation.reservationCabins = arregloReservasCabanas;
		updatedReservation.totalPrice = getTotalCheckout(updatedReservation);
		setReservation(updatedReservation);
	};

	const actualizarGuests = (cabinNumber, isAdult, newQty) => {
		const updatedReservation = { ...reservation };
		const arregloReservasCabanas = [...updatedReservation.reservationCabins];
		for (const reservaCabana of arregloReservasCabanas) {
			const index = arregloReservasCabanas.indexOf(reservaCabana);
			if (reservaCabana.cabinNumber === cabinNumber) {
				if (isAdult) {
					reservaCabana.adults = newQty;
				} else {
					reservaCabana.childrens = newQty;
				}
				arregloReservasCabanas[index] = reservaCabana;
				break;
			}
		}
		updatedReservation.reservationCabins = arregloReservasCabanas;
		setReservation(updatedReservation);
	};

	// ESTADOS PARA LA VALIDACIÓN DE CONTACTO
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [extranjero, setExtranjero] = useState(false);


	// FUNCIÓN PARA ACTUALIZAR AUTOMÁTICAMENTE LOS CAMPOS DE CONTACTO
	const handleContactChange = (event) => {
		const { name, value, type, checked } = event.target;
		if (name === "countryOfResidence"){
			if (value !== "chile"){
				setReservation({...reservation, totalPrice: Math.floor((reservation.totalPrice - (reservation.totalPrice*0.19)))})
				setExtranjero(true)
			} 
		}
		setReservation((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// VALIDACIÓN DE LOS CAMPOS DE CONTACTO
	const validateContact = () => {
		let newErrors = {};

		if (!reservation.nameClient.trim().match(/^[a-zA-Z\s]+$/)) {
			newErrors.nameClient = "Por favor, ingresa tu nombre solo con letras.";
		}
		if (!reservation.emailClient.includes("@")) {
			newErrors.emailClient = "Por favor, ingresa un correo válido.";
		}
		if (!reservation.phoneClient.match(/^[0-9]+$/)) {
			newErrors.phoneClient = "El teléfono debe contener solo números.";
		}
		if (!reservation.countryOfResidence) {
			newErrors.countryOfResidence = "Por favor, selecciona tu país.";
		}
		if (!reservation.terms) {
			newErrors.terms = "Debes aceptar los términos y condiciones.";
		}
		return newErrors;
	};

	const manageMainGuest = (cabinNumber, mainGuest) => {
		const updatedReservation = { ...reservation };
		const arregloReservasCabanas = [...updatedReservation.reservationCabins];
		for (const reservaCabana of arregloReservasCabanas) {
			const index = arregloReservasCabanas.indexOf(reservaCabana);
			if (reservaCabana.cabinNumber === cabinNumber) {
				reservaCabana.mainGuest = mainGuest
				arregloReservasCabanas[index] = reservaCabana;
				break;
			}
		}
		updatedReservation.reservationCabins = arregloReservasCabanas;
		setReservation(updatedReservation);
	}

	// --------------------------------------------------------------------------------
	// FUNCIÓN QUE SE EJECUTA AL PRESIONAR "CONFIRMAR RESERVA"
	const handleConfirmReservation = async () => {
		setIsSubmitted(true);
		const newErrors = validateContact();
		setErrors(newErrors);

		if (Object.keys(newErrors).length > 0) {
			return;
		}
		// Si no hay errores, se envía la reserva
		try {
			setLoading(true);
			const data = {reservation: reservation, reservationRange: reservationRange};
			console.log("data: ", data)
			const { newReservation } = await createReservation(data);
			console.log("Reserva final a enviada:", newReservation);
			setError(null);
			navigate("/pago-ok");
			//send to other view
		} catch (err) {
			setError(err.message);
			console.error("Error al crear la cabaña:", err);
			navigate("/pago-error");
			//send to other view
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1 * 1000);
			// setLoading(false);
		}
	};

		// Renderizado condicional según el estado de carga
		if (loading) {
			return (
				<div className="container-first d-flex flex-column">
					<Header />
					<main className="container-fluid container-xl d-flex flex-column justify-content-center align-items-center">
						<div className="spinner-border text-primary" role="status">
						</div>
						<span>Cargando...</span>
						<TermsConditions />
						<SectionMap />
					</main>
				</div>
			);
		}
	
		if (error) {
			return (
				<div className="container-first d-flex flex-column">
					<Header />
					<main className="container-fluid container-xl">
						<div className="alert alert-danger" role="alert">
							Error al cargar los datos: {error}
						</div>
						<TermsConditions />
						<SectionMap />
					</main>
				</div>
			);
		}

	// --------------------------------------------------------------------------------
	// RENDERIZADO DEL COMPONENTE
	return (
		<>
			<Header />
			<div className="container">
				<div className="row">
					{/* SECCIÓN DE DETALLES DE HABITACIONES */}
					<div className="col-12 col-lg-8 mb-4 ps-0">
						{reservation.reservationCabins.map((reservationCabin) => {
							const cabinNumber = reservationCabin.cabinNumber;
							const cabin = getCabinByNumber(cabinNumber, cabinsActive);
							let amenitiesText = "Comodidades: " + cabin.amenities.reduce((texto, amenitie) => texto + amenitie + ", ", "");
							amenitiesText = amenitiesText.slice(0, amenitiesText.length - 2);

							const detalles = ["Vista: Lago General Carrera - Patagonia Chilena.", cabin.size, cabin.bedType, amenitiesText, "Estacionamiento: Gratuito."];

							return <ReserveDetails key={cabinNumber} keyValue={cabinNumber} precioBase={cabin.pricePerNight} precioTinaja={cabin.priceHotTubPerInstance} nombreHabitacion={cabin.typeName} capacidad={cabin.capacity} detalles={detalles} cabins={cabinsActive} servicios={["No incluye desayuno."]} reservationCabin={reservationCabin} reservationRange={reservationRange} manageFechasTinajas={(cabinNumber, hotTubDates) => actualizarFechasTinajas(cabinNumber, hotTubDates)} manageGuests={(cabinNumber, isAdult, newQty) => actualizarGuests(cabinNumber, isAdult, newQty)} manageMainGuest={manageMainGuest} />;
						})}
					</div>

					{/* SECCIÓN DE RESUMEN DE LA RESERVA */}
					<div className="col-12 col-lg-4 px-0">
						<ReserveResume extranjero={extranjero} reservation={reservation} reservationRange={reservationRange} cabins={cabinsActive} qtyCabinsSelection={qtyCabinsSelection} cabinsTypes={cabinsTypes} onConfirmReservation={handleConfirmReservation} />
					</div>
				</div>

				{/* SECCIÓN DE CONTACTO */}
				<div className="container">
					<div className="row justify-content-left">
						<ContactInformationForm reservation={reservation} onChange={handleContactChange} errors={errors} isSubmitted={isSubmitted} />
					</div>
				</div>

				<TermsConditions />
				<SectionMap />
			</div>
			<Footer />
		</>
	);
};

export default Checkout;
