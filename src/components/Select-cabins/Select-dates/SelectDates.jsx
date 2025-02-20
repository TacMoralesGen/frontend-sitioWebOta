/* eslint-disable react/prop-types */
import "./SelectDates.css";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { es } from "date-fns/locale"; // Spanish locale
import { isSameDay, addDays, eachDayOfInterval, format } from "date-fns";
import { MONTHS } from "../../../scripts/utils";

registerLocale("es", es);
setDefaultLocale("es");

const currentDate = new Date(2025, 1, 8);

// Función que retorna true o false si la fecha está en un arreglo de fechas.
const isDateInList = (date, disabledList) => {
	return disabledList.some((disabledDate) => isSameDay(date, disabledDate));
};

const SelectDates = ({ disabledDates, checkIn, checkOut, manageCheckIn, manageCheckOut, showAvailableCabins, reservedRange }) => {
	const disabledDatesEndBackup = disabledDates.map((day) => addDays(day, 1));
	const [isCheckInOpen, setIsCheckInOpen] = useState(false);
	const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
	const [disabledDatesEnd, setDisabledDatesEnd] = useState(disabledDatesEndBackup);

	const isRangeValid = (start, end) => {
		if (!start || !end) return true;
		if (isSameDay(start, end)) return false;
		const range = eachDayOfInterval({ start: addDays(start, 1), end });
		return !range.some((date) => isDateInList(date, disabledDatesEnd));
	};

	const handleCheckInChange = (date) => {
		manageCheckIn(date);
		setIsCheckInOpen(false); // Cierra el calendario de check-in
		setIsCheckOutOpen(true); // Abre el calendario de check-out
		const disabledDatesEndUpdated = disabledDatesEnd.filter((disabledDateEnd) => {
			if (!isSameDay(disabledDateEnd, date)) return true;
			return false;
		});
		setDisabledDatesEnd(disabledDatesEndUpdated);

		// Reset Check-out if invalid
		if (checkOut && (!isRangeValid(date, checkOut) || checkOut <= date)) {
			manageCheckOut(null);
		}
	};

	const handleCheckOutChange = (date) => {
		if (isRangeValid(checkIn, date)) {
			setIsCheckOutOpen(false); // cierra el calendario de check-out
			manageCheckOut(date);
		}
	};

	return (
		<section className="d-flex flex-column">
			<section className="date-section order-2">
				<form className="row justify-content-center">
					{/* Check-in DatePicker */}
					<div className="col-sm-auto col-12 text-center py-2 py-lg-0 d-flex flex-column select-date-container">
						<label htmlFor="checkin" className="label_datepicker">
							Fecha Llegada / Check In
						</label>
						<DatePicker
							id="checkin"
							selected={checkIn}
							startDate={checkIn}
							endDate={checkOut}
							onSelect={handleCheckInChange}
							selectsStart
							minDate={currentDate}
							excludeDates={disabledDates}
							placeholderText="Fecha de entrada"
							monthsShown={window.innerWidth > 991 ? 2 : 1}
							locale="es"
							dateFormat="dd/MM/yyyy"
							initialMonth={currentDate} // Mes inicial
							open={isCheckInOpen} // Controla si el calendario está abierto
							onCalendarOpen={() => {
								setIsCheckInOpen(true);
								setIsCheckOutOpen(false);
							}} // Abre el calendario de check-in
							onCalendarClose={() => setIsCheckInOpen(false)} // Cierra el calendario de check-in
						/>
					</div>
					{/* Check-out DatePicker */}
					<div className="col-sm-auto col-12 text-center py-2 py-lg-0 d-flex flex-column select-date-container">
						<label htmlFor="checkout" className="label_datepicker">
							Fecha Salida / Check Out
						</label>
						<DatePicker
							id="checkout"
							selected={checkOut}
							startDate={checkIn}
							endDate={checkOut}
							onSelect={handleCheckOutChange}
							selectsEnd
							minDate={checkIn ? checkIn : new Date()}
							excludeDates={disabledDatesEnd}
							placeholderText="Fecha de salida"
							monthsShown={window.innerWidth > 991 ? 2 : 1}
							locale="es"
							dateFormat="dd/MM/yyyy"
							initialMonth={currentDate} // Mes inicial
							disabled={!checkIn} // Disable if no check-in is selected
							open={isCheckOutOpen} // Controla si el calendario está abierto
							onCalendarOpen={() => {
								setIsCheckOutOpen(true);
								setIsCheckInOpen(false);
							}} // Abre el calendario de check-out
							onCalendarClose={() => setIsCheckOutOpen(false)} // Cierra el calendario de check-out
						/>
					</div>
					<div className="col-sm-auto col-12 text-center pt-2 pt-lg-0 d-flex align-items-end justify-content-center">
						<button className="search-cabins btn btn-primary mt-3" id="reservar" disabled={!checkIn || !checkOut || (isSameDay(checkIn, reservedRange[0]) && isSameDay(checkOut, addDays(reservedRange[reservedRange.length - 1], 1)))} onClick={showAvailableCabins}>
							<strong>Buscar Cabañas</strong>
						</button>
					</div>
				</form>
			</section>

			{reservedRange.length > 0 ? (
				<section className="order-3">
					<h4 className="text-center">
						{`Disponibilidad de cabañas entre`} {`el ${format(reservedRange[0], "dd")} de ${MONTHS[format(reservedRange[0], "MMMM")]} y ${format(addDays(reservedRange[reservedRange.length - 1], 1), "dd")} de ${MONTHS[format(addDays(reservedRange[reservedRange.length - 1], 1), "MMMM")]}`}
					</h4>
				</section>
			) : (
				<section className="order-1">
					<h3 className="text-center">Seleccione las fechas para desplegar cabañas disponibles</h3>
				</section>
			)}
		</section>
	);
};

export default SelectDates;
