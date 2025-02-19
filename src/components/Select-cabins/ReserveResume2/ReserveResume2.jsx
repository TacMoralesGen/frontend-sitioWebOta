/* eslint-disable react/prop-types */
import "./ReserveResume2.css";
import { addDays } from "date-fns";
import { dateToString, numberWithDot } from "../../../scripts/utils";

const ReserveResume2 = ({ reservedRange, cabinsSelection, total, cabinsTypes }) => {
	const qtyOfNights = reservedRange.length;
	const checkInCapture = () => {
		if (reservedRange.length) return dateToString(reservedRange[0]);
		else return "check in";
	};
	const checkOutCapture = () => {
		if (reservedRange.length) return dateToString(addDays(reservedRange[reservedRange.length - 1], 1));
		else return "check out";
	};
	// Verificar si 'Tinaja Caliente' está incluido en los servicios adicionales
	// const tinajaSeleccionada = serviciosAdicionales.includes("Tinaja Caliente") ? "Tinaja Caliente" : "No incluye servicio adicional";

	const generateListCabins = (cabinsSelection, cabinsTypes) => {
		const liElements = [];
		let i = 1;
		for (const cabinTypeName of cabinsSelection.keys()) {
			if (cabinsSelection.has(cabinTypeName)) {
				const qtyOfaType = cabinsSelection.get(cabinTypeName);
				for (let j = 1; j <= qtyOfaType; j++){
					const liElement = (
						<div key={`cabinResume-${i}`}>
							#{i} {cabinTypeName} ${numberWithDot(cabinsTypes.get(cabinTypeName).pricePerNight)}
						</div>
					);
					liElements.push(liElement);
					i++
				}
			}
		}
		return liElements;
	};

	const maxAdults = () => {
		let maxAdultos = 0;
		for (let cabinTypeQty of cabinsSelection.values()) {
			maxAdultos += cabinTypeQty * 2;
		}
		return maxAdultos;
	};

	const maxChildrens = () => {
		let maxNinos = 0;
		for (let [cabinTypeName, cabinTypeQty] of cabinsSelection) {
			if (cabinTypeName === "Tiny Cabin") maxNinos += cabinTypeQty * 2;
			else if (cabinTypeName === "Couple Room") maxNinos += 0;
		}
		return maxNinos;
	};

	const msgNoCabinSelected = "No ha seleccionado cabañas"

	if (reservedRange.length === 0) {
		return <section className="col-12 col-lg-4 mb-4 card"></section>;
	} else {
		return (
			<section className="col-12 col-lg-4 mb-4 card">
				<div className="card-body">
					<h4 className="card-title">Resumen de la Reserva</h4>
					<ul className="list-unstyled text-start">
						<li>
							<strong>Fecha de reserva:</strong>
							<div className="row">
								<div className="col-md-6">
									<strong>Entrada:</strong>
									<div>{checkInCapture()}</div>
								</div>
								<div className="col-md-6">
									<strong>Salida:</strong>
									<div>{checkOutCapture()}</div>
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
							<div>{maxAdults() > 0 ? generateListCabins(cabinsSelection, cabinsTypes) : msgNoCabinSelected}</div>
						</li>
						<li className="pt-3">
							<strong>Capacidad Máxima:</strong>
						</li>
						{maxAdults() > 0 ? <li>
							{maxAdults()} adultos en {(maxAdults()/2) > 1 ? `${(maxAdults()/2)} Camas Queen`: `${(maxAdults()/2)} Cama Queen`} {maxChildrens() > 0 ? "+" : ""} 
						</li> : <li>{msgNoCabinSelected}</li>	}
						{maxChildrens() > 0 ? 
						<li>{maxChildrens()} niños en {(maxChildrens()/2) > 1 ? `${(maxChildrens()/2)} Literas de 2 camas`: `${(maxChildrens()/2)} Litera de 2 camas`}
						</li>
						: ""}
						<hr />
						<li>
							<strong>Total precio {maxAdults() > 2 ? "cabañas" : "cabaña"}:</strong>
						</li>
						{maxAdults() > 0 ? (<li id="precioTotal">CLP ${numberWithDot(total)} <strong>IVA incluido</strong></li>) :
						(<li id="precioTotal">{msgNoCabinSelected}</li>)}
						<li id="mensajeIvaExento" style={{ display: "none"}}>
								*turistas extranjeros exentos de IVA
						</li>
						<div className="mt-4 text-center">
							<button type="button" className="btn btn-success opacity-50">
								Ir al Checkout
							</button>
						</div>
					</ul>
				</div>
			</section>
		);
	}
};

export default ReserveResume2;
