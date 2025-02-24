/* eslint-disable react/prop-types */
import "./ReserveResume2.css";
import { numberWithDot, formatToChileanDate, maxAdults, maxChildrens, checkInCapture, checkOutCapture, isHotTubDateSelected } from "../../../scripts/utils";
import { Link } from "react-router-dom";

const generateListCabins = (qtyCabinsSelection, cabinsTypes, qtyOfNights) => {
	const divElements = [];
	let i = 1;
	let totalQtyCabins = 0;
	for (const qtyCabinType of qtyCabinsSelection.values()) {
		totalQtyCabins += qtyCabinType;
	}
	for (const cabinTypeName of qtyCabinsSelection.keys()) {
		if (qtyCabinsSelection.has(cabinTypeName)) {
			const qtyOfaType = qtyCabinsSelection.get(cabinTypeName);
			for (let j = 1; j <= qtyOfaType; j++) {
				const classList = `${i === totalQtyCabins ? "" : "pb-3"}`;
				const divElement = (
					<div key={`cabinResume-${i}`} className={classList}>
						<strong>#{i}</strong> {cabinTypeName} <br />
						<div className="cabin-detail-resume">
							<div className="ic-cabin"></div>&nbsp;
							<div>
								Cabaña: ${numberWithDot(cabinsTypes.get(cabinTypeName).pricePerNight)} x {qtyOfNights} {qtyOfNights > 1 ? "noches" : "noche"} = ${numberWithDot(cabinsTypes.get(cabinTypeName).pricePerNight * qtyOfNights)}
							</div>
						</div>
					</div>
				);
				divElements.push(divElement);
				i++;
			}
		}
	}
	return divElements;
};

const ReserveResume2 = ({ reservationRange, qtyCabinsSelection, total, cabinsTypes }) => {
	const qtyOfNights = reservationRange.length;
	const msgNoCabinSelected = "No ha seleccionado cabañas";
	const totalCabins = (() => {
		let total = 0;
		for (const value of qtyCabinsSelection.entries()){
			total += value[1]
		}
		return total
	})()

	if (reservationRange.length === 0) {
		return (
			<section className="col-12 col-lg-4 ">
				<div className="card p-0 d-flex align-items-center h-100">
					<h4 className=" my-auto">Resumen de la reserva</h4>
				</div>
			</section>
		);
	} else {
		return (
			<section className="col-12 col-lg-4 mb-4 card p-2">
				<div className="card-body">
					<h4 className="card-title">Resumen de la Reserva</h4>
					<ul className="list-unstyled text-start">
						<li>
							<strong>Fecha de reserva:</strong>
							<div className="row">
								<div className="col-md-6">
									<strong>Entrada:</strong>
									<div>{formatToChileanDate(checkInCapture(reservationRange))}</div>
								</div>
								<div className="col-md-6">
									<strong>Salida:</strong>
									<div>{formatToChileanDate(checkOutCapture(reservationRange))}</div>
								</div>
							</div>
						</li>

						<li className="mt-3">
							<strong>Duración de la estadía:</strong>
							<div>{qtyOfNights} noches</div>
						</li>
						<hr />

						<li>
							<strong>Detalle {totalCabins} {totalCabins > 1 ? "Cabañas" : "Cabaña"}:</strong>
							<div>{maxAdults(qtyCabinsSelection) > 0 ? generateListCabins(qtyCabinsSelection, cabinsTypes, reservationRange.length) : msgNoCabinSelected}</div>
						</li>
						<li className="pt-3">
							<strong>Capacidad Máxima:</strong>
						</li>
						{maxAdults(qtyCabinsSelection) > 0 ? (
							<li>
								{maxAdults(qtyCabinsSelection)} adultos en {maxAdults(qtyCabinsSelection) / 2 > 1 ? `${maxAdults(qtyCabinsSelection) / 2} Camas Queen` : `${maxAdults(qtyCabinsSelection) / 2} Cama Queen`} {maxChildrens(qtyCabinsSelection) > 0 ? "+" : ""}
							</li>
						) : (
							<li>{msgNoCabinSelected}</li>
						)}
						{maxChildrens(qtyCabinsSelection) > 0 ? (
							<li>
								{maxChildrens(qtyCabinsSelection)} niños en {maxChildrens(qtyCabinsSelection) / 2 > 1 ? `${maxChildrens(qtyCabinsSelection) / 2} Literas de 2 camas` : `${maxChildrens(qtyCabinsSelection) / 2} Litera de 2 camas`}
							</li>
						) : (
							""
						)}
						<hr />
						<li>
							<strong>Total precio {maxAdults(qtyCabinsSelection) > 2 ? "cabañas" : "cabaña"}:</strong>
						</li>
						{maxAdults(qtyCabinsSelection) > 0 ? (
							<li id="precioTotal">
								CLP ${numberWithDot(total)} <strong>IVA incluido</strong>
							</li>
						) : (
							<li id="precioTotal">{msgNoCabinSelected}</li>
						)}
						<li id="mensajeIvaExento" style={{ display: "none" }}>
							*turistas extranjeros exentos de IVA
						</li>
						<div className="mt-4">
							<Link className={maxAdults(qtyCabinsSelection) === 0 ?
								"to-checkout btn btn-primary d-flex align-items-center justify-content-center m-auto disabled" :
								"to-checkout btn btn-primary d-flex align-items-center justify-content-center m-auto"}
								to="/checkout" state={{ reservationRange: reservationRange, qtyCabinsSelection: qtyCabinsSelection }}>
								<strong>Confirmar Reserva &gt;</strong>
							</Link>
						</div>
					</ul>
				</div>
			</section>
		);
	}
};

export default ReserveResume2;
