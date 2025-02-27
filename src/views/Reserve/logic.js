import { dateToString } from "../../scripts/utils";
import { addDays } from "date-fns";
import imgTinyCabin from "../../assets/images/tinyCabin.jpg"
import imgCoupleRoom from "../../assets/images/coupleRoom.avif"

// Función para obtener los diferentes tipos de cabañas
const getCabinsTypes = (cabins) => {
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

// Función para filtrar cabañas activas
const getActiveCabins = (cabins) => cabins.filter((cabin) => cabin.statusCabin === "Activa");

// Función para contar cabañas activas por tipo
const getCabinsActiveByType = (cabinsTypes, cabinsActive) => {
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
const getCabinsOccupancyByDate = (cabinsTypes, cabinsActive) => {
  const reservationsMap = new Map();
  cabinsActive.forEach((cabin) => {
    const { reservedDates, typeName } = cabin;
    reservedDates.forEach((date) => {
      // Convierte la fecha string a objeto Date si viene de la API INNECESARIO, DESDE LA BBDD VIENE COMO DATE
      const dateObj = typeof date === "string" ? new Date(date) : date;
      const dateString = dateToString(dateObj);
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

// Función para obtener las fechas deshabilitadas
const getDisabledDates = (qtyCabins, cabinsOccupancyByDate, cabinsTypes) => {
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

// Función para generar una selección vacía de cabañas
const generateCabinSelectionEmpty = (cabinsTypes) => {
  const selection = new Map();
  for (const cabinType of cabinsTypes.keys()) {
    selection.set(cabinType, 0);
  }
  return selection;
};

// Función para obtener las cabañas disponibles en un rango de fechas por tipo
const getCabinsAvailableInRangeByType = (reservationRange, cabinsAvailabilityByDate, cabinsTypes, cabinsActiveByType) => {
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

export { getCabinsTypes, getActiveCabins, getCabinsActiveByType, getCabinsOccupancyByDate, getDisabledDates, getCabinsAvailabilityByDate, generateCabinSelectionEmpty, getCabinsAvailableInRangeByType };
