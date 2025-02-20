import { addDays } from "date-fns";

export const numberWithDot = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const generateNumberOptionsElements = (number) => {
  let options = [];
  let i = 0;
  for ( ; i <= number; i++ ){
    options.push(<option key={i} value={i}>{i}</option>);
  }
  return options
}

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

export const dateToString = date => date.toISOString().split("T")[0];
// export const stringDateToDate = date => date.toISOString().split("T")[0];

export const getTotal = (cabinsSelection, cabinsTypes) => { //se usa cuando se consulta un nuevo rango de fecha (por default se reinician a 1). Y también se usa cuando cambie la option seleccionada (selected) a otro numero
	let total = 0;
	for (const [cabinType, qtySelected] of cabinsSelection) {
		total += qtySelected * cabinsTypes.get(cabinType).pricePerNight;
	}
	return total;
}

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
  December: "Diciembre"
};