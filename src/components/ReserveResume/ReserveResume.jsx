/* eslint-disable react/prop-types */
import { getCabinByNumber, numberWithDot, getTotalAdults, getTotalChildrens, isHotTubDateSelected, formatToChileanDate, getSubTotal, maxAdults } from "../../scripts/utils";

const generateListCabins = (qtyCabinsSelection, cabinsTypes, qtyOfNights, reservationCabins, cabins) => {
	const divElements = [];
	let totalQtyCabins = 0;
	for (const qtyCabinType of qtyCabinsSelection.values()) {
		totalQtyCabins += qtyCabinType;
	}
	for (let i = 1; i <= reservationCabins.length; i++) {
		const reservationCabin = reservationCabins[i-1];

		const subTotal = reservationCabin.priceHotTub + reservationCabin.priceCabin
		const cabinNumber = reservationCabin.cabinNumber
		const cabin = getCabinByNumber(cabinNumber, cabins);
		const cabinTypeName = cabin.typeName
		const qtyInstanceHotTub = reservationCabin.datesHotTub.length;
		const classList = `${i === totalQtyCabins ? "" : "pb-3"}`;
		const divElement = (
			<div key={`cabinResume-${i}`} className={classList}>
				<strong>#{i}</strong> {cabinTypeName} sub-total ${numberWithDot(subTotal )}<br />
				<div className="cabin-detail-resume">
					<div className="ic-cabin"></div>&nbsp;
					<div>
						Cabaña: ${numberWithDot(cabinsTypes.get(cabinTypeName).pricePerNight)} x {qtyOfNights} {qtyOfNights > 1 ? "noches" : "noche"} = ${numberWithDot(reservationCabin.priceCabin)}
					</div>
				</div>
				{qtyInstanceHotTub > 0 ? (
					<div className="cabin-detail-resume">
						<div className="ic-hot-tub"></div>&nbsp;
						<div>
							Tinaja: ${numberWithDot(cabinsTypes.get(cabinTypeName).priceHotTubPerInstance)} x {qtyInstanceHotTub} {qtyInstanceHotTub > 1 ? "usos" : "uso"} = ${numberWithDot(reservationCabin.priceHotTub)}
						</div>
					</div>
				) : (
					""
				)}
			</div>
		);
		divElements.push(divElement);
	}
	return divElements;
};

const msgNoCabinSelected = "No ha seleccionado cabañas";

const ReserveResume = ({ reservation, reservationRange, cabins, qtyCabinsSelection, cabinsTypes }) => {
	const fechaEntrada = reservation.checkinDate;
	const fechaSalida = reservation.checkoutDate;
	const total = reservation.totalPrice;
	const reservationCabins = reservation.reservationCabins;
	const duracionEstadia = reservationRange.length;
	const totalCabins = reservationCabins.length;

	return (
			<div className="card p-2 rounded-0">
				<div className="card-body">
					<h4 className="card-title fw-bold">Resumen de la Reserva</h4>
					<ul className="list-unstyled text-start">
						<li>
							<strong>Fecha de reserva:</strong>
							<div className="row">
								<div className="col-md-6">
									<strong>Entrada:</strong>
									<div>{formatToChileanDate(fechaEntrada)}</div>
								</div>
								<div className="col-md-6">
									<strong>Salida:</strong>
									<div>{formatToChileanDate(fechaSalida)}</div>
								</div>
							</div>
						</li>

						<li className="mt-3">
							<strong>Duración total de la estadía:</strong>
							<div>{duracionEstadia} noches</div>
						</li>
						<hr />

						
						<li>
							<strong>Total de Huéspedes ingresados:</strong>
						</li>
						<li>
							<strong>Adultos:</strong> <span>{getTotalAdults(reservationCabins)}</span>
						</li>
						<li>
							<strong>Niños:</strong> <span>{getTotalChildrens(reservationCabins)}</span>
						</li>

						<hr />

						{/* Bloque de cabañas */}
						<li>
							<strong>
								Detalle {totalCabins} {totalCabins > 1 ? "Cabañas" : "Cabaña"}:
							</strong>
							<div>{maxAdults(qtyCabinsSelection) > 0 ? generateListCabins(qtyCabinsSelection, cabinsTypes, reservationRange.length, reservationCabins, cabins) : msgNoCabinSelected}</div>
						</li>

						<hr />


						{/* Total a Pagar */}
						<li>
							<strong>Total a pagar:</strong>
						</li>
						<li id="precioTotal">
							CLP${numberWithDot(total)} <strong>IVA incluido</strong>
							{total > 0 && (
								<li id="mensajeIvaExento" style={{ display: "block" }}>
									*turistas extranjeros exentos de IVA
								</li>
							)}
						</li>

						{/* Botón de confirmación */}
						<div className="mt-4 text-center">
							<button type="button" className="btn btn-primary text-white">
								<strong>Confirmar reserva</strong>
							</button>
						</div>
					</ul>
				</div>
			</div>
	);
};

export default ReserveResume;

//Detalle de la reserva antes del pago. 
