/* eslint-disable react/prop-types */
import React from "react";

import "./Checkout.css";
import Header from "../../components/Header/Header";
import { useState } from "react";
import ReserveDetails from "../../components/ReserveDetails/ReserveDetails";
import ReserveResume from "../../components/ReserveResume/ReserveResume";
import imgTinyCabin from "../../assets/images/chalenco1.jpg";
import imgCoupleRoom from "../../assets/images/chalenco2.avif";
import Footer from "../../components/Footer/Footer";
import ContactInformationForm from "../../components/Contact-information-form/ContactInformationForm";
import TermsConditions from "../../components/Terms-conditions/TermsConditions";
import SectionMap from "../../components/Map/Map";
import { useLocation } from "react-router-dom";
import { isSameDay, addDays } from "date-fns";
import { dateToString, getTotalCheckout, getTotalReserve } from "../../scripts/utils";

/*--------------------------*/
/*LLAMADA A LA BASE DE DATOS*/
/*--------------------------*/
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

const initialReservation = {
	documentTypeClient: null,
	documentNumberClient: null,
	nameClient: null,
	countryOfResidence: null,
	phoneClient: null,
	emailClient: null,
	checkinDate: null,
	checkoutDate: null,
	statusReservation: "Pendiente",
	totalPrice: null,
	notes: null,
	reservationCabins: [],
};

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

const getCabinByNumber = (number, cabins) => {
	for (const cabin of cabins) {
		if (number === cabin.number) {
			return cabin;
		}
	}
	return null;
};

const Checkout = () => {
	const { reservationRange, qtyCabinsSelection } = useLocation().state;
	const cabinsAvailableInRange = getCabinsAvailableInRange(reservationRange, cabinsActive);
	const specificCabinsSelected = getSpecificCabinsSelected(cabinsAvailableInRange, qtyCabinsSelection);
	const checkIn = reservationRange[0];
	const checkOut = addDays(reservationRange[reservationRange.length - 1], 1);
	const total = getTotalReserve(qtyCabinsSelection, cabinsTypes, reservationRange.length);
	const reservationCabinsInit = [];
	for (const cabin of specificCabinsSelected) {
		const cabinReservation = {
			cabinNumber: cabin.number,
			adults: 0,
			childrens: 0,
			mainGuest: null,
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
	const [reservation, setReservation] = useState(initialReservation);

	// Función que actualiza los servicios adicionales
	const actualizarFechasTinajas = (cabinNumber, hotTubDates) => {
		const updatedReservation = { ...reservation };
		const arregloReservasCabanas = [...reservation.reservationCabins];
		for (const reservaCabana of arregloReservasCabanas) {
			const index = arregloReservasCabanas.indexOf(reservaCabana);
			const priceHotTubPerInstance = getCabinByNumber(cabinNumber, cabinsActive).priceHotTubPerInstance;
			if (reservaCabana.cabinNumber === cabinNumber) {
				reservaCabana.datesHotTub = hotTubDates;
				reservaCabana.priceHotTub = hotTubDates.length * priceHotTubPerInstance;
				arregloReservasCabanas[index] = reservaCabana;
				break;
			}
		}
		updatedReservation.reservationCabins = arregloReservasCabanas;
		updatedReservation.totalPrice = getTotalCheckout(updatedReservation);
		console.log("updatedReservation:", updatedReservation); //POR BORRAR
		setReservation(updatedReservation);
	};

  const actualizarGests = (cabinNumber, isAdult, newQtyGuests) => {
    
  }
	// return <button onClick={() => actualizarFechasTinajas(203, [new Date(2025, 1, 8), new Date(2025, 1, 9)])}>click</button>;

	return (
		<>
			<Header />
			<div className="container">
				<div className="row">
					{/* Mostrar detalles de las habitaciones */}
					<div className="col-12 col-lg-8 mb-4">
						{reservation.reservationCabins.map(({ cabinNumber, adults, childrens, mainGuest, datesHotTub, priceCabin, priceHotTub }) => {
              const cabin = getCabinByNumber(cabinNumber)
              let amenitiesText = "Comodidades: " + cabin.amenities.reduce((texto, amenitie) => texto + amenitie + ", " );
              amenitiesText = amenitiesText.slice(0, amenitiesText.length - 2)
              const detalles = [
                "Vista: Lago General Carrera - Patagonia Chilena.",
                cabin.size,
                cabin.bedType,
                amenitiesText,
                "Estacionamiento: Gratuito."]
              return (<ReserveDetails
                  key={cabinNumber} // Usando nombreHabitacion como clave única
                  precioBase={cabin.pricePerNight}
                  precioTinaja={cabin.priceHotTubPerInstance}
                  nombreHabitacion={cabin.typeName}
                  capacidad={cabin.capacity}
                  detalles={detalles}
                  servicios={["No incluye desayuno."]}
                  reservation={reservation}
                  manageFechasTinajas = {(cabinNumber, hotTubDates) => actualizarFechasTinajas(cabinNumber, hotTubDates)}
                  manageGuests = {(cabinNumber, hotTubDates) => actualizarGests(cabinNumber, isAdult, newQtyGuests)}
                />
              )})};
					</div>
					{/* Mostrar resumen de la reserva */}
					<div className="col-12 col-lg-4 mb-4">
						<ReserveResume habitaciones={habitaciones} totalAdultos={habitaciones.reduce((acc, habitacion) => acc + habitacion.adultos, 0)} totalNinos={habitaciones.reduce((acc, habitacion) => acc + habitacion.ninos, 0)} serviciosAdicionales={serviciosAdicionales} totalReserva={totalReserva} />
					</div>
				</div>
				<ContactInformationForm />
			</div>
			<TermsConditions></TermsConditions>
			<SectionMap></SectionMap>
			<Footer />
		</>
	);
};

export default Checkout;
