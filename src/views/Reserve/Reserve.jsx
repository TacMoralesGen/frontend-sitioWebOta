import { useState, useEffect, useRef } from "react";

import "./Reserve.css";
import Header from "../../components/Header/Header";
import SelectDates from "../../components/Select-cabins/Select-dates/SelectDates";
import SelectCabins from "../../components/Select-cabins/SelectCabins";
import ReserveResume2 from "../../components/Select-cabins/ReserveResume2/ReserveResume2";
import TermsConditions from "../../components/Terms-conditions/TermsConditions";
import SectionMap from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
import BounceLoader from "react-spinners/BounceLoader";

import { getCabins } from "../../../api";

import { dateToString, getDatesBetween, getTotalReserve } from "../../scripts/utils";
import { addDays } from "date-fns";


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
			resultDatesOccupied.push(addDays(new Date(date), 1));
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
const generateCabinSelectionEmpty = (cabinsTypes) => {
	const selection = new Map();
	for (const cabinType of cabinsTypes.keys()) {
		selection.set(cabinType, 0);
	}
	return selection;
};
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
const getCabinTypes = (cabins) => {
	(() => {
		const cabinSummary = new Map();
		cabins.forEach((cabin) => {
			if (!cabinSummary.get(cabin.typeName)) {
				cabinSummary.set(cabin.typeName, {
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
	})
}

const Reserve = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [cabins, setCabins] = useState(null); //selectDates
	const [qtyCabinsSelection, setQtyCabinsSelection] = useState(null);


	const cabinsTypes = useRef(null);
	const cabinsActive = useRef(null);
	const cabinsActiveByType = useRef(null);
	const cabinsOccupancyByDate = useRef(null);
	const disabledDates = useRef(null);
	const cabinsAvailabilityByDate = useRef(null);

	useEffect(() => {
		setIsLoading(true);
		try {
			getCabins().then(newCabins => {
				setCabins(newCabins);
				const newCabinsTypes = getCabinTypes(newCabins)
				cabinsTypes.current = newCabinsTypes;
				const newQtyCabinsSelection = generateCabinSelectionEmpty(newCabinsTypes);
				setQtyCabinsSelection(newQtyCabinsSelection);
				const newCabinsActive = newCabins.filter((cabin) => cabin.statusCabin === "Activa")
				cabinsActive.current = newCabinsActive;
				const newCabinsActiveByType = getCabinsActiveByType(newCabinsTypes, newCabinsActive)
				cabinsActiveByType.current = newCabinsActiveByType;
				const newCabinsOccupancyByDate = getCabinsOccupancyByDate(newCabinsTypes, newCabinsActive)
				cabinsOccupancyByDate.current = newCabinsOccupancyByDate;
				const newDisabledDates = getDisabledDates(newCabinsActive.length, newCabinsOccupancyByDate, newCabinsTypes)
				disabledDates.current = newDisabledDates;
				const newCabinsAvailabilityByDate = getCabinsAvailabilityByDate(new Map(newCabinsOccupancyByDate), newCabinsActiveByType)
				cabinsAvailabilityByDate.current = newCabinsAvailabilityByDate;
			});
			// setIsLoading(false);
			setTimeout(() => {
				setIsLoading(false);
			}, 2 * 1000);
		} catch (error) {
			console.error(error);
		}
	}, []);

	const [checkIn, setCheckIn] = useState(null); //selectDates
	const [checkOut, setCheckOut] = useState(null); //selectDates
	const [reservationRange, setreservationRange] = useState([]); //selectCabins y reserveResume solo se pasa la variable.
	const [total, setTotal] = useState(0); //setTotal pasarselo a selectCabins, total pasarselo a reserveResume.
	const [cabinsAvailableInRange, setCabinsAvailableInRange] = useState(0); //setTotal pasarselo a selectCabins, total pasarselo a reserveResume.

	const showAvailableCabins = (event) => {
		event.preventDefault();
		let newreservationRange = getDatesBetween(checkIn, checkOut);
		setreservationRange(newreservationRange);
		setTotal(0);
		setCabinsAvailableInRange(getCabinsAvailableInRangeByType(newreservationRange, cabinsAvailabilityByDate, cabinsTypes, cabinsActiveByType));
		setCabinsSelection(generateCabinSelectionEmpty());
	};

	const changeSelectOfACabinType = (cabinType, newQty) => {
		const newCabinsSelection = new Map(qtyCabinsSelection);
		newCabinsSelection.set(cabinType, newQty);
		setQtyCabinsSelection(newCabinsSelection);
		setTotal(getTotalReserve(newCabinsSelection, cabinsTypes, reservationRange.length));
	};

	return (
		<div className="container-first d-flex flex-column">
			<Header />
			{isLoading ? (
				<main className="d-flex justify-content-center align-items-center w-100">
					<BounceLoader color="#78BD95" loading size={100} />
				</main>		
			) : (
				<main className="container-fluid container-xl">
					
					<TermsConditions />
					<SectionMap />
				</main>
			)}
			<Footer />
		</div>
	);
};

export default Reserve;
