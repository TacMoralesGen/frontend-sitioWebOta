import { useState } from "react";

import "./Reserve.css";
import Header from "../../components/Header/Header";
import SelectDates from "../../components/Select-cabins/Select-dates/SelectDates";
import SelectCabins from "../../components/Select-cabins/SelectCabins";
import imgTinyCabin from "../../assets/images/chalenco1.jpg";
import imgCoupleRoom from "../../assets/images/chalenco2.avif";
import ReserveResume2 from "../../components/Select-cabins/ReserveResume2/ReserveResume2";
import TermsConditions from "../../components/Terms-conditions/TermsConditions";
import SectionMap from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
import "../../customBootstrap.css";
import "./reserve.css"

import { dateToString, getDatesBetween, getTotal } from "../../scripts/utils";
import { addDays } from "date-fns";

const cabins = [
	{
		typeName: "Tiny Cabin",
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 2,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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
		idCabinType: 1,
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

const getCabinsActiveByType = (cabinsTypes, cabinsActive) => {
	const qtyCabinsAvailableByType = new Map(cabinsTypes);
	cabinsTypes.forEach((_value, key) => {
		let qtyCabinTypeAvailability = 0;
		for (const cabin of cabinsActive){
			qtyCabinTypeAvailability += cabin.typeName === key ? 1 : 0;
		}
		qtyCabinsAvailableByType.set(key, qtyCabinTypeAvailability);
	});
	return qtyCabinsAvailableByType;
};

const getCabinsOccupancyByDate = (cabinsTypes, cabinsActive) => {
	const reservationsMap = new Map();
	cabinsActive.forEach((cabin) => {
		const { reservedDates, typeName } = cabin;
		reservedDates.forEach((date) => {
			const dateString = dateToString(date);
			if (!reservationsMap.has(dateString)) {
				const initialCounts = {};
				for (const cabinType of cabinsTypes.keys()) {
					initialCounts[cabinType] = 0;
				}
				reservationsMap.set(dateString, initialCounts);
			}
			const dailyCount = reservationsMap.get(dateString);
			if (Object.prototype.hasOwnProperty.call(dailyCount, typeName)) {
				dailyCount[typeName] += 1;
			}
			reservationsMap.set(dateString, dailyCount);
		});
	});
	return reservationsMap;
};
const getDisabledDates = (qtyCabins, cabinsOccupancyByDate, cabinsTypes) => {
	const resultDatesOccupied = [];
	for (const [date, occupancy] of cabinsOccupancyByDate) {
		let totalReserved = 0;
		for (const cabinType of cabinsTypes.keys()) {
			totalReserved += occupancy[cabinType] || 0;
		}
		if (totalReserved === qtyCabins) {
			resultDatesOccupied.push( addDays(new Date(date), 1));
		}
	}
	return resultDatesOccupied;
};
const getCabinsAvailabilityByDate = (cabinsOccupancyByDateToReverse, cabinsActiveByType) => {
	for (let [keyDate, cabinOccupancyOfADay] of cabinsOccupancyByDateToReverse) {
		const cabinAvailabilityOfADay = {};
		for (const [cabinType, availableQty] of cabinsActiveByType) {
			cabinAvailabilityOfADay[cabinType] = availableQty - (cabinOccupancyOfADay[cabinType] || 0);
		}
		cabinsOccupancyByDateToReverse.set(keyDate, cabinAvailabilityOfADay);
	}
	return cabinsOccupancyByDateToReverse; 
};
const cabinsActiveByType = getCabinsActiveByType(cabinsTypes, cabinsActive);
const cabinsOccupancyByDate = getCabinsOccupancyByDate(cabinsTypes, cabinsActive);
const disabledDates = getDisabledDates(cabinsActive.length, cabinsOccupancyByDate, cabinsTypes);
const cabinsAvailabilityByDate = getCabinsAvailabilityByDate(new Map(cabinsOccupancyByDate), cabinsActiveByType);

const generateCabinSelectionEmpty = () => {
	const selection = new Map();
	for (const cabinType of cabinsTypes.keys()){
		selection.set(cabinType, 0);
	}
	return selection;
};

const getCabinsAvailableInRangeByType = (reservedRange, cabinsAvailabilityByDate, cabinsTypes, cabinsActiveByType) => {
	const reservedRangeString = []
	reservedRange.forEach(date => reservedRangeString.push(dateToString(date)));
	let cabinsAvailabilityByDateInRange = new Map();
	for (const date of reservedRangeString) {
		let cabinAvailabilityOfADayByType = 
			cabinsAvailabilityByDate.has(date) ? cabinsAvailabilityByDate.get(date) : Object.fromEntries(cabinsActiveByType);
		cabinsAvailabilityByDateInRange.set(date, cabinAvailabilityOfADayByType);
	}
	let minAvailableInRangeByType = new Map(cabinsTypes);
	// eslint-disable-next-line no-unused-vars
	for (let [keyType, _value] of minAvailableInRangeByType.entries()) {
		let minAvailable = cabinsActiveByType.get(keyType);
		// eslint-disable-next-line no-unused-vars
		for (let [_keyDate, availabilityInADayByType] of cabinsAvailabilityByDateInRange.entries()) {
			minAvailable = availabilityInADayByType[keyType] < minAvailable ? availabilityInADayByType[keyType] : minAvailable;
		}
		minAvailableInRangeByType.set(keyType, minAvailable);
	}
	return minAvailableInRangeByType;
};




const Reserve = () => {
	const [checkIn, setCheckIn] = useState(null); //selectDates 
	const [checkOut, setCheckOut] = useState(null); //selectDates
	const [cabinsSelection, setCabinsSelection] = useState(generateCabinSelectionEmpty()); //selectCabins y reserveResume
	const [reservedRange, setReservedRange] = useState([]); //selectCabins y reserveResume solo se pasa la variable.
	const [total, setTotal] = useState(0); //setTotal pasarselo a selectCabins, total pasarselo a reserveResume.
	const [cabinsAvailableInRange, setCabinsAvailableInRange] = useState(0); //setTotal pasarselo a selectCabins, total pasarselo a reserveResume.

	const showAvailableCabins = (event) => {
		event.preventDefault();
		let newReservedRange = getDatesBetween(checkIn, checkOut)
		setReservedRange(newReservedRange);
		setTotal(0);
		setCabinsAvailableInRange(getCabinsAvailableInRangeByType(newReservedRange, cabinsAvailabilityByDate, cabinsTypes, cabinsActiveByType));
		setCabinsSelection(generateCabinSelectionEmpty())
	}

	const changeSelectOfACabinType = (cabinType, newQty) => {
		const newCabinsSelection = new Map(cabinsSelection);
		newCabinsSelection.set(cabinType, newQty);
		setCabinsSelection(newCabinsSelection);
		setTotal(getTotal(newCabinsSelection, cabinsTypes));
	}

	return (
		<div className="container-first d-flex flex-column">
			<Header />
			<main className="container-fluid container-xl">
				<SelectDates disabledDates={disabledDates} checkIn={checkIn} checkOut={checkOut} manageCheckIn={(newCheckIn) => setCheckIn(newCheckIn)} manageCheckOut={(newCheckOut) => setCheckOut(newCheckOut)} showAvailableCabins={showAvailableCabins} reservedRange={reservedRange} />
				<div className="row">
					{/* Mostrar detalles de las habitaciones */}
					<SelectCabins 
						reservedRange={reservedRange} //arreglo de fechas en que se solicita la reserva
						cabinsTypes={cabinsTypes} //Objeto Map las llaves son los tipos de cabañas ("TinyCabin", "CoupleRoom") que su valor es un objeto con las caracteristicas de ese tipo de TinyCabin existen con sus caracteristicas.
						cabinsSelection={cabinsSelection} //La cantidad seleccionada en los formularios de cabañas (selection)
						manageCabinsSelection={(cabinType, newQty) => changeSelectOfACabinType(cabinType, newQty)} //Función a ejecutar cuando se cambie la seleccion de cabañas.
						cabinsAvailabilityByDateInRange={cabinsAvailableInRange} //La llave de este objeto map es la fecha en string (hay dos funciónes en utils que lo transforma de date a string y de string a date) y su valor también es un map con llaves cabinType y sus valores es la cantidad máxima disponible en el rango especificado por reservedRange 
						/>
					{/* Mostrar resumen de la reserva */}
					<ReserveResume2 reservedRange={reservedRange} cabinsSelection={cabinsSelection} total={total} cabinsTypes={cabinsTypes}></ReserveResume2>
				</div>
        <TermsConditions />
        <SectionMap />
			</main>
			<Footer />
		</div>
	);
};

export default Reserve;
