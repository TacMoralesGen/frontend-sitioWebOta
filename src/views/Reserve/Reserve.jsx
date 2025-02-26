import { useState, useEffect } from "react";

import "./Reserve.css";
import Header from "../../components/Header/Header";
import SelectDates from "../../components/Select-cabins/Select-dates/SelectDates";
import SelectCabins from "../../components/Select-cabins/SelectCabins";
import ReserveResume2 from "../../components/Select-cabins/ReserveResume2/ReserveResume2";
import TermsConditions from "../../components/Terms-conditions/TermsConditions";
import SectionMap from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
import "../../customBootstrap.css";
import "./reserve.css";

import { getDatesBetween, getTotalReserve } from "../../scripts/utils";
import { getCabins } from "../../../api"
import {
	getCabinsTypes,
	getActiveCabins,
	getCabinsActiveByType,
	getCabinsOccupancyByDate,
	getDisabledDates,
	getCabinsAvailabilityByDate,
	generateCabinSelectionEmpty,
	getCabinsAvailableInRangeByType
} from "./logic.js"

import { addDays } from "date-fns";

const Reserve = () => {
	// Estados para los datos de la API
	const [cabins, setCabins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Estados derivados (calculados a partir de los datos de la API)
	const [cabinsTypes, setCabinsTypes] = useState(new Map());
	const [cabinsActiveByType, setCabinsActiveByType] = useState(new Map());
	const [disabledDates, setDisabledDates] = useState([]);
	const [disabledDatesEnd, setDisabledDatesEnd] = useState([]);
	const [cabinsAvailabilityByDate, setCabinsAvailabilityByDate] = useState(new Map());

	// Estados de la UI
	const [checkIn, setCheckIn] = useState(null);
	const [checkOut, setCheckOut] = useState(null);
	const [qtyCabinsSelection, setCabinsSelection] = useState(new Map());
	const [reservationRange, setReservationRange] = useState([]);
	const [total, setTotal] = useState(0);
	const [cabinsAvailableInRange, setCabinsAvailableInRange] = useState(0);

	// Efecto para cargar los datos de la API
	useEffect(() => {
		const fetchCabins = async () => {
			try {
				setLoading(true);
				const { cabins } = await getCabins();
				setCabins(cabins);
				setError(null);
			} catch (err) {
				setError(err.message);
				console.error("Error al obtener la disponibilidad de las cabañas:", err);
			} finally {
				setTimeout(() => {
					setLoading(false);}, 1*1000
				)
				// setLoading(false);
			}
		};

		fetchCabins();
	}, []);

	// Efecto para calcular los valores derivados cuando se carguen las cabañas
	useEffect(() => {
		if (cabins.length > 0) {
			console.log("cabins:",cabins);
			console.log(typeof (cabins[0].reservedDates[0]));
			// Calcular todos los valores derivados
			const active = getActiveCabins(cabins);
			console.log("cabinsActive:",active);

			const types = getCabinsTypes(cabins);// Map, llaves son Cabin Type y Couple Room. Las propiedades son las mismas que las del modelo y extras
			const activeByType = getCabinsActiveByType(types, active); //Cabanas activas por tipo

			const occupancyByDate = getCabinsOccupancyByDate(types, active);
			console.log("occupancyByDate:",occupancyByDate);

			const disabled = getDisabledDates(active.length, occupancyByDate, types);
			
			const availabilityByDate = getCabinsAvailabilityByDate(new Map(occupancyByDate), activeByType);
			const disabledDatesEnd = disabled.map((day) => addDays(day, 1));

			// Establecer todos los estados derivados
			setCabinsTypes(types);
			setCabinsActiveByType(activeByType);
			setDisabledDates(disabled);
			setDisabledDatesEnd(disabledDatesEnd);
			setCabinsAvailabilityByDate(availabilityByDate);

			// Inicializar la selección de cabañas vacía
			setCabinsSelection(generateCabinSelectionEmpty(types));
		}
	}, [cabins]);

	// Manejador para mostrar cabañas disponibles
	const showAvailableCabins = (event) => {
		event.preventDefault();
		let newReservationRange = getDatesBetween(checkIn, checkOut);
		setReservationRange(newReservationRange);
		setTotal(0);
		setCabinsAvailableInRange(getCabinsAvailableInRangeByType(newReservationRange, cabinsAvailabilityByDate, cabinsTypes, cabinsActiveByType));
		setCabinsSelection(generateCabinSelectionEmpty(cabinsTypes));
	};

	// Manejador para cambiar selección de cabaña
	const changeSelectOfACabinType = (cabinType, newQty) => {
		const newCabinsSelection = new Map(qtyCabinsSelection);
		newCabinsSelection.set(cabinType, newQty);
		setCabinsSelection(newCabinsSelection);
		setTotal(getTotalReserve(newCabinsSelection, cabinsTypes, reservationRange.length));
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

	return (
		<div className="container-first d-flex flex-column">
			<Header />
			<main className="container-fluid container-xl">
				<SelectDates disabledDates={disabledDates} disabledDatesEnd={disabledDatesEnd} manageDisabledDatesEnd={(newDisabledDatesEnd) => setDisabledDatesEnd(newDisabledDatesEnd)} checkIn={checkIn} checkOut={checkOut} manageCheckIn={(newCheckIn) => setCheckIn(newCheckIn)} manageCheckOut={(newCheckOut) => setCheckOut(newCheckOut)} showAvailableCabins={showAvailableCabins} reservationRange={reservationRange} />
				<div className="row">
					{/* Mostrar detalles de las habitaciones */}
					<SelectCabins reservationRange={reservationRange} cabinsTypes={cabinsTypes} qtyCabinsSelection={qtyCabinsSelection} manageCabinsSelection={(cabinType, newQty) => changeSelectOfACabinType(cabinType, newQty)} cabinsAvailabilityByDateInRange={cabinsAvailableInRange} />
					{/* Mostrar resumen de la reserva */}
					<ReserveResume2 reservationRange={reservationRange} qtyCabinsSelection={qtyCabinsSelection} total={total} cabinsTypes={cabinsTypes} />
				</div>
				<TermsConditions />
				<SectionMap />
			</main>
			<Footer />
		</div>
	);
};

export default Reserve;
