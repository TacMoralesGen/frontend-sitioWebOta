import { addDays, format } from "date-fns";

export const numberWithDot = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const generateNumberOptionsElements = (inicio, fin) => {
	let options = [];
	let i = inicio;
	for (; i <= fin; i++) {
		options.push(
			<option key={i} value={i}>
				{i}
			</option>
		);
	}
	return options;
};

export const getDatesBetween = (initDate, endDate) => {
	const dates = [];
	initDate = new Date(initDate);
	endDate = new Date(endDate);
	let currentDate = new Date(initDate);
	while (currentDate < endDate) {
		dates.push(new Date(currentDate));
		currentDate = addDays(currentDate, 1);
	}
	return dates;
};

export const dateToString = (date) => date.toISOString().split("T")[0];
// export const stringDateToDate = date => date.toISOString().split("T")[0];

export const getTotalReserve = (qtyCabinsSelection, cabinsTypes, qtyOfNights) => {
	//se usa cuando se consulta un nuevo rango de fecha (por default se reinician a 1). Y también se usa cuando cambie la option seleccionada (selected) a otro numero
	let total = 0;
	for (const [cabinType, qtySelected] of qtyCabinsSelection) {
		total += qtySelected * cabinsTypes.get(cabinType).pricePerNight * qtyOfNights;
	}
	return total;
};

export const getTotalCheckout = (reservation) => {
	//se usa cuando se consulta un nuevo rango de fecha (por default se reinician a 1). Y también se usa cuando cambie la option seleccionada (selected) a otro numero
	let reservationCabins = reservation.reservationCabins;
	let total = 0;
	for (const reservationCabin of reservationCabins) {
		total += reservationCabin.priceCabin + reservationCabin.priceHotTub;
	}
	return total;
};

export const getCabinByNumber = (number, cabins) => {
	for (const cabin of cabins) {
		if (number === cabin.number) {
			return cabin;
		}
	}
	return null;
};

export const MONTHS = {
	January: "Enero",
	February: "Febrero",
	March: "Marzo",
	April: "Abril",
	May: "Mayo",
	June: "Junio",
	July: "Julio",
	August: "Agosto",
	September: "Septiembre",
	October: "Octubre",
	November: "Noviembre",
	December: "Diciembre",
};

export const MONTHSSHORT = {
	January: "Ene",
	February: "Feb",
	March: "Mar",
	April: "Abr",
	May: "May",
	June: "Jun",
	July: "Jul",
	August: "Ago",
	September: "Sep",
	October: "Oct",
	November: "Nov",
	December: "Dic",
};

export const getTotalAdults = (reservationCabins) => {
	return reservationCabins.reduce((totalAdults, reservationCabin) => (totalAdults += reservationCabin.adults), 0);
};

export const getTotalChildrens = (reservationCabins) => {
	return reservationCabins.reduce((totalChildrens, reservationCabin) => (totalChildrens += reservationCabin.childrens), 0);
};

export const isHotTubDateSelected = (reservationCabins) => {
  if (!reservationCabins) return false;
	return reservationCabins.some((reservationCabin) => reservationCabin.datesHotTub.length > 0);
};

export const formatToChileanDate = (date) => {
	return `${format(date, "dd")} de ${MONTHS[format(date, "MMMM")]}, ${format(date, "yyyy")}`;
};

export const getSubTotal = (cabinNumber, reservationCabins) => {
	console.log("cabinNumber", cabinNumber);
	console.log("reservationCabins", reservationCabins);
	for (const reservationCabin of reservationCabins) {
		console.log("reservationCabin", reservationCabin);
		console.log("reservationCabin.cabinNumber", reservationCabin.cabinNumber);
		console.log("cabinNumber", cabinNumber);
		if (reservationCabin.cabinNumber === cabinNumber) {
			return reservationCabin.priceHotTub + reservationCabin.priceCabin;
		}
	}
	return null;
};

export const maxAdults = (qtyCabinsSelection) => {
	let maxAdultos = 0;
	for (let cabinTypeQty of qtyCabinsSelection.values()) {
		maxAdultos += cabinTypeQty * 2;
	}
	return maxAdultos;
};

export const maxChildrens = (qtyCabinsSelection) => {
	let maxNinos = 0;
	for (let [cabinTypeName, cabinTypeQty] of qtyCabinsSelection) {
		if (cabinTypeName === "Tiny Cabin") maxNinos += cabinTypeQty * 2;
		else if (cabinTypeName === "Couple Room") maxNinos += 0;
	}
	return maxNinos;
};


export const checkInCapture = (reservationRange) => {
  if (reservationRange.length) return reservationRange[0];
  else return "check in";
};
export const checkOutCapture = (reservationRange) => {
  if (reservationRange.length) return addDays(reservationRange[reservationRange.length - 1], 1);
  else return "check out";
};
