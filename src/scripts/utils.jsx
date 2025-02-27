import imgTinyCabin from "../assets/images/tinyCabin.jpg"
import imgCoupleRoom from "../assets/images/coupleRoom.avif"
import { addDays, format } from "date-fns";

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
//Le pasas un numero y devuelve el string con punto separador de miles
export function numberWithDot (number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
//Auxiliar para generar dropdown de números
export function generateNumberOptionsElements (inicio, fin) {
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
//Obtiene un arreglo de fechas con todas las fechas entre initDate y endDate, incluyendo initDate pero EXCLUYENDO endDate
export function getDatesBetween (initDate, endDate) {
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

//fecha a string
export function dateToString (date) {
  if (date instanceof Date && !isNaN(date)) {
    return date.toISOString().split("T")[0];
  } else if (typeof date === 'string' || date instanceof String){
    return date.slice(0,10) //asume que la base de datos devuelve "2025-02-03T03:00:00.000Z" este formato
  }

}
//stringDate a fecha
export function stringDateToDate (stringDate) { 
	stringDate.toISOString().split("T")[0];
}
//getTotal diseñado para reserva (por mejorar)
export function getTotalReserve (qtyCabinsSelection, cabinsTypes, qtyOfNights) {
	//se usa cuando se consulta un nuevo rango de fecha (por default se reinician a 1). Y también se usa cuando cambie la option seleccionada (selected) a otro numero
	let total = 0;
	for (const [cabinType, qtySelected] of qtyCabinsSelection) {
		total += qtySelected * cabinsTypes.get(cabinType).pricePerNight * qtyOfNights;
	}
	return total;
};
//getTotal diseñado para checkout (por mejorar)
export function getTotalCheckout (reservation) {
	//se usa cuando se consulta un nuevo rango de fecha (por default se reinician a 1). Y también se usa cuando cambie la option seleccionada (selected) a otro numero
	let reservationCabins = reservation.reservationCabins;
	let total = 0;
	for (const reservationCabin of reservationCabins) {
		total += reservationCabin.priceCabin + reservationCabin.priceHotTub;
	}
	return total;
};
//busca entre el arreglo de cabanas (cabins) la primera cabana que la propiedad number sea igual al number (que deberia ser dato unico de todas formas) 
export function getCabinByNumber (number, cabins) {
	for (const cabin of cabins) {
		if (number === cabin.number) {
			return cabin;
		}
	}
	return null;
};
//suma todos los adultos de la lista de reservationCabins (idealmente el arreglo de reservationCabins debe ser la totalidad asociada de un reservation)
export function getTotalAdults (reservationCabins) {
	return reservationCabins.reduce((totalAdults, reservationCabin) => (totalAdults += reservationCabin.adults), 0);
};
//suma todos los niños de la lista de reservationCabins (idealmente el arreglo de reservationCabins debe ser la totalidad asociada de un reservation)
export function getTotalChildrens (reservationCabins) {
	return reservationCabins.reduce((totalChildrens, reservationCabin) => (totalChildrens += reservationCabin.childrens), 0);
};
//solo devuelve true si hay aunque sea un reservationCabin del arreglo que tenga fechas guardadas en reservedDates
export function isHotTubDateSelected (reservationCabins) {
  if (!reservationCabins) return false;
	return reservationCabins.some((reservationCabin) => reservationCabin.datesHotTub.length > 0);
};
//Formate para 01 de Enero, 2025 
export function formatToChileanDate (date) {
	return `${format(date, "dd")} de ${MONTHS[format(date, "MMMM")]}, ${format(date, "yyyy")}`;
};
//Formate para 01 de Enero, 2025 
export function formatToChileanDateShort (date) {
	return `${format(date, "dd")}-${format(date, "MM")}`;
};
//obtiene el subtotal (priceHotTub + priceCabin) de la cabaña con el numero cabinNumber 
export function getSubTotal (cabinNumber, reservationCabins) {
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
//Capacidad de adultos segun las cabañas seleccionadas (solo pa reserva)
export function maxAdults (qtyCabinsSelection) {
	let maxAdultos = 0;
	for (let cabinTypeQty of qtyCabinsSelection.values()) {
		maxAdultos += cabinTypeQty * 2;
	}
	return maxAdultos;
};
//Capacidad de niños segun las cabañas seleccionadas (solo pa reserva)
export function maxChildrens (qtyCabinsSelection) {
	let maxNinos = 0;
	for (let [cabinTypeName, cabinTypeQty] of qtyCabinsSelection) {
		if (cabinTypeName === "Tiny Cabin") maxNinos += cabinTypeQty * 2;
		else if (cabinTypeName === "Couple Room") maxNinos += 0;
	}
	return maxNinos;
};
//reservationRange[0]
export function checkInCapture (reservationRange) {
  if (reservationRange.length) return reservationRange[0];
  else return "check in";
};
//la ultima fecha de reservationRange + 1 día
export function checkOutCapture (reservationRange) {
  if (reservationRange.length) return addDays(reservationRange[reservationRange.length - 1], 1);
  else return "check out";
};
// Obtener los diferentes tipos de cabañas (Objeto Map con 2 llaves: Tiny Cabin y Couple Room)
export function getCabinsTypes (cabins) {
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
        img: cabin.typeName === "Tiny Cabin" ? imgTinyCabin : imgCoupleRoom
      });
    }
  });
  return cabinSummary;
};
// Filtra las cabañas activas
export function getActiveCabins (cabins) {
	return cabins.filter((cabin) => cabin.statusCabin === "Activa");
}
// Obtener los diferentes tipos de cabañas (Objeto Map con 2 llaves: Tiny Cabin y Couple Room), apuntando a su cantidad.
export function getCabinsActiveByType (cabinsTypes, cabinsActive) {
  const qtyCabinsAvailableByType = new Map(cabinsTypes);
  cabinsTypes.forEach((_value, key) => {
    let qtyCabinTypeAvailability = 0;
    for (const cabin of cabinsActive) {
      qtyCabinTypeAvailability += cabin.typeName === key ? 1 : 0;
    }
    qtyCabinsAvailableByType.set(key, qtyCabinTypeAvailability);
  });
  return qtyCabinsAvailableByType;
};
// Función para obtener la ocupación de cabañas por fecha
// [02/02/2025]:
//    Tiny Cabin: 3
//    Couple Room: 2
// [03/02/2025]:
//    Tiny Cabin: 5
//    Couple Room: 7
export function getCabinsOccupancyByDate (cabinsTypes, cabinsActive) {
  const reservationsMap = new Map();
  cabinsActive.forEach((cabin) => {
    const { reservedDates, typeName } = cabin;

    reservedDates.forEach((date) => {
      const stringDate = dateToString(date);
      if (!reservationsMap.has(stringDate)) {
        const initialCounts = {};
        for (const cabinType of cabinsTypes.keys()) {
          initialCounts[cabinType] = 0;
        }
        reservationsMap.set(stringDate, initialCounts);
      }
      const dailyCount = reservationsMap.get(stringDate);
      if (Object.prototype.hasOwnProperty.call(dailyCount, typeName)) {
        dailyCount[typeName] += 1;
      }
      reservationsMap.set(stringDate, dailyCount);
    });
  });
  return reservationsMap;
};
// Función para obtener las fechas deshabilitadas
export function getDisabledDates (qtyCabins, cabinsOccupancyByDate, cabinsTypes) {
  const resultDatesOccupied = [];
  for (const [date, occupancy] of cabinsOccupancyByDate) {
    let totalReserved = 0;
    for (const cabinType of cabinsTypes.keys()) {
      totalReserved += occupancy[cabinType] || 0;
    }
    if (totalReserved === qtyCabins) {
      resultDatesOccupied.push(addDays(new Date(date), 1));
    }
  }
  return resultDatesOccupied;
};
// Función para obtener disponibilidad de cabañas por fecha
export function getCabinsAvailabilityByDate (cabinsOccupancyByDateToReverse, cabinsActiveByType) {
  for (let [keyDate, cabinOccupancyOfADay] of cabinsOccupancyByDateToReverse) {
    const cabinAvailabilityOfADay = {};
    for (const [cabinType, availableQty] of cabinsActiveByType) {
      cabinAvailabilityOfADay[cabinType] = availableQty - (cabinOccupancyOfADay[cabinType] || 0);
    }
    cabinsOccupancyByDateToReverse.set(keyDate, cabinAvailabilityOfADay);
  }
  return cabinsOccupancyByDateToReverse;
};
// Función para generar una selección vacía de cabañas
export function generateCabinSelectionEmpty (cabinsTypes) {
  const selection = new Map();
  for (const cabinType of cabinsTypes.keys()) {
    selection.set(cabinType, 0);
  }
  return selection;
};
// Función para obtener las cabañas disponibles en un rango de fechas por tipo
// [02/02/2025]:
//    Tiny Cabin: 7
//    Couple Room: 8
// [03/02/2025]:
//    Tiny Cabin: 5
//    Couple Room: 7
export function getCabinsAvailableInRangeByType (reservationRange, cabinsAvailabilityByDate, cabinsTypes, cabinsActiveByType) {
  const reservationRangeString = [];
  reservationRange.forEach((date) => reservationRangeString.push(dateToString(date)));
  let cabinsAvailabilityByDateInRange = new Map();
  for (const date of reservationRangeString) {
    let cabinAvailabilityOfADayByType = cabinsAvailabilityByDate.has(date) ? cabinsAvailabilityByDate.get(date) : Object.fromEntries(cabinsActiveByType);
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

export function getChangedValues(oldObj, newObj) {
  let changes = {};

  for (let key in newObj) {
    if (newObj[key] !== oldObj[key]) {
      changes[key] = newObj[key]; // Store only changed values
    }
  }

  return changes;
}