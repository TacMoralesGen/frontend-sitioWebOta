/* eslint-disable react/prop-types */
// import { useEffect } from "react";
import "./SelectCabins.css";
import SelectCabin from "./Select-Cabin/SelectCabin";

const SelectCabins = ({ reservationRange, cabinsTypes, qtyCabinsSelection, manageCabinsSelection, cabinsAvailabilityByDateInRange}) => {
	const generateSelectCabins = (cabinsTypes, qtyAvailable) => {
		let collectionSelectCabin = [];
		for (let keyType of cabinsTypes.keys()) {
			const qtyAvailableOfSpecificType = qtyAvailable.get(keyType);
			if (qtyAvailableOfSpecificType > 0) {
				const cabinType = cabinsTypes.get(keyType);
				const selectCabinComponent = 
					<SelectCabin 
						key={`${keyType}selectCabin`}
						keyValue={`${keyType}selectCabin`}
						cabinType={cabinType}
						qtyAvailable={qtyAvailableOfSpecificType}
						qtyCabinsSelection={qtyCabinsSelection}
						manageCabinsSelection={manageCabinsSelection}
						reservationRange={reservationRange}
					/>;
				collectionSelectCabin.push(selectCabinComponent);
				collectionSelectCabin.push(<hr key={keyType + "hr"} className="m-0 w-100" />);
			}
		}
		collectionSelectCabin.pop();
		return collectionSelectCabin;
	};

	if (reservationRange.length === 0) {
		return (
			<section className="col-12 col-lg-8 ps-0">
				<div className="card p-0 d-flex align-items-center h-100">
					<h4 className="my-auto py-4">Aquí se desplegarán las cabañas disponibles.</h4>
				</div>
			</section>
		);
	} else {
		return (
			<section className="col-12 col-lg-8 ps-0">
				<div key={"ASDASDASDASD"} className="card p-2 d-flex align-items-center">
					{generateSelectCabins(cabinsTypes, cabinsAvailabilityByDateInRange)}
				</div>
			</section>
		);
	}
};

export default SelectCabins;
