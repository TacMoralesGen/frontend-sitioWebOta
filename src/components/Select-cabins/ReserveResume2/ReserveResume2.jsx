/* eslint-disable react/prop-types */
import "./ReserveResume2.css";
import { addDays, format } from "date-fns";
import { MONTHS, numberWithDot } from "../../../scripts/utils";
import { Link } from "react-router-dom";

const ReserveResume2 = ({ reservationRange, qtyCabinsSelection, total, cabinsTypes }) => {
	const qtyOfNights = reservationRange.length;
	const checkInCapture = () => {
		if (reservationRange.length) return reservationRange[0];
		else return "check in";
	};
	const checkOutCapture = () => {
		if (reservationRange.length) return addDays(reservationRange[reservationRange.length - 1], 1);
		else return "check out";
	};

	const formatToChileanDate = (date) => {
		return `${format(date, "dd")} de ${MONTHS[format(date, "MMMM")]}, ${format(date, "yyyy")}`;
	};
	// Verificar si 'Tinaja Caliente' está incluido en los servicios adicionales
	// const tinajaSeleccionada = serviciosAdicionales.includes("Tinaja Caliente") ? "Tinaja Caliente" : "No incluye servicio adicional";

	const generateListCabins = (qtyCabinsSelection, cabinsTypes, qtyOfNights) => {
		const divElements = [];
		let i = 1;
		for (const cabinTypeName of qtyCabinsSelection.keys()) {
			if (qtyCabinsSelection.has(cabinTypeName)) {
				const qtyOfaType = qtyCabinsSelection.get(cabinTypeName);
				for (let j = 1; j <= qtyOfaType; j++) {
					const liElement = (
						<div key={`cabinResume-${i}`}>
							#{i} {cabinTypeName} ${numberWithDot(cabinsTypes.get(cabinTypeName).pricePerNight)} x {qtyOfNights} = ${numberWithDot(cabinsTypes.get(cabinTypeName).pricePerNight * qtyOfNights)}
						</div>
					);
					divElements.push(liElement);
					i++;
				}
			}
		}
		return divElements;
	};

	const maxAdults = () => {
		let maxAdultos = 0;
		for (let cabinTypeQty of qtyCabinsSelection.values()) {
			maxAdultos += cabinTypeQty * 2;
		}
		return maxAdultos;
	};

	const maxChildrens = () => {
		let maxNinos = 0;
		for (let [cabinTypeName, cabinTypeQty] of qtyCabinsSelection) {
			if (cabinTypeName === "Tiny Cabin") maxNinos += cabinTypeQty * 2;
			else if (cabinTypeName === "Couple Room") maxNinos += 0;
		}
		return maxNinos;
	};

	const msgNoCabinSelected = "No ha seleccionado cabañas";

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
									<div>{formatToChileanDate(checkInCapture())}</div>
								</div>
								<div className="col-md-6">
									<strong>Salida:</strong>
									<div>{formatToChileanDate(checkOutCapture())}</div>
								</div>
							</div>
						</li>

						<li className="mt-3">
							<strong>Duración de la estadía:</strong>
							<div>{qtyOfNights} noches</div>
						</li>
						<hr />

						<li>
							<strong>Cabañas:</strong>
							<div>{maxAdults() > 0 ? generateListCabins(qtyCabinsSelection, cabinsTypes, reservationRange.length) : msgNoCabinSelected}</div>
						</li>
						<li className="pt-3">
							<strong>Capacidad Máxima:</strong>
						</li>
						{maxAdults() > 0 ? (
							<li>
								{maxAdults()} adultos en {maxAdults() / 2 > 1 ? `${maxAdults() / 2} Camas Queen` : `${maxAdults() / 2} Cama Queen`} {maxChildrens() > 0 ? "+" : ""}
							</li>
						) : (
							<li>{msgNoCabinSelected}</li>
						)}
						{maxChildrens() > 0 ? (
							<li>
								{maxChildrens()} niños en {maxChildrens() / 2 > 1 ? `${maxChildrens() / 2} Literas de 2 camas` : `${maxChildrens() / 2} Litera de 2 camas`}
							</li>
						) : (
							""
						)}
						<hr />
						<li>
							<strong>Total precio {maxAdults() > 2 ? "cabañas" : "cabaña"}:</strong>
						</li>
						{maxAdults() > 0 ? (
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
							<Link className={maxAdults() === 0 ? 
								"to-checkout btn btn-primary d-flex align-items-center justify-content-center m-auto disabled" : 
								"to-checkout btn btn-primary d-flex align-items-center justify-content-center m-auto"}
								to="/checkout"
								state={{reservationRange: reservationRange, qtyCabinsSelection: qtyCabinsSelection}}
							>
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
