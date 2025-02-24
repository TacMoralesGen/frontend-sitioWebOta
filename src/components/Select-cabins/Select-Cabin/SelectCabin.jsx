/* eslint-disable react/prop-types */
import "./SelectCabin.css";
import { useState } from "react";

import { numberWithDot, generateNumberOptionsElements } from "../../../scripts/utils";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";

const SelectCabin = ({ keyValue, cabinType, qtyAvailable, qtyCabinsSelection, manageCabinsSelection, reservationRange }) => {
	const [showModal, setShowModal] = useState(false);


	// Ejecución de la función usEffect con su callback (código arbitrario)
	useEffect(() => { 
		//El código arbitrario es resetear el input
		//(no la variable de estado qtyCabinsSelection, si no que solo el elemento visual: el tag select)
		//El codigo que corre en el front-end, es decir las interfaces document y window, deben colocarse en useEffect
		//Altamente usado para suscribirse a eventos, para interfaces con alta interactividad (editor de imagen, videojuego)
		const selectElement = document.getElementById(`${keyValue}select`);
		selectElement.value = 0;
	}, [reservationRange, keyValue])

	const { typeName, capacity, priceHotTubPerInstance, pricePerNight, amenities, size, bedType, img } = cabinType;

	const runManageCabinsSelection = (e) => {
		const newValue = Number(e.target.value);
		manageCabinsSelection(typeName, newValue);
	}

	return (
		<article id={keyValue.toString()} className="row w-100 py-3">
			<div className="col-12 col-md-5">
				<img src={img} alt={`Habitación desde dentro, de la ${typeName}`} className="responsive-image img-fluid" />
			</div>
			<div className="col-12 col-md-7 py-0 px-4 d-flex flex-column">
				<div className="d-flex justify-content-between align-items-center">
					<h6 className="mb-3 title-select-qty-cabin">Cabañas <strong>{typeName}</strong></h6>
					{/* <h6 className="mb-3 title-select-qty-cabin">Cabaña <strong>{typeName}</strong>: hay {qtyAvailable} {qtyAvailable > 1 ? `cabañas disponibles` : "cabaña disponible"}</h6> */}
				</div>
				<div>
					<span>
						<i className="fa fa-battery-full" aria-hidden="true"></i>
						<i className="fa fa-headphones" aria-hidden="true"></i>
					</span>
					<p className="mb-1">
						Capacidad:&nbsp;
							{typeName === "Couple Room"? capacity : capacity/2} adultos&nbsp;
							{typeName === "Couple Room"? "" : `y ${capacity/2} niños`}
					</p>
					<p className="mb-1">
						Camas: {bedType}
					</p>
					<p className="mb-1">Precio por noche: ${numberWithDot(pricePerNight)}</p>
					<label className="form-label w-100 text-end mt-2" htmlFor={`${keyValue}select`}>
						{qtyAvailable > 1 ? `Hay ${qtyAvailable} cabañas disponibles` : "Solo hay 1 cabaña disponible"}
						<br />
						<strong>{qtyAvailable > 1 ? "¿Cuantas cabañas reserva?" : "¿Desea reservar la cabaña?"}</strong>
					</label>
				</div>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<button className="btn btn-outline-primary mb-1 d-flex align-self-end details-btn" onClick={()=> setShowModal(true)}>
						<span className="eye-icon" /> Ver detalles
					</button>
					<div className="d-flex flex-row flex-wrap">
						<div className="form-group mx-2 d-flex flex-column align-items-end">
							<select
								className="form-select form-select-sm qty-cabins"
								id={`${keyValue}select`}
								key={`${keyValue}select`}
								aria-label="selecciona cantidad de cabañas"
								onChange={runManageCabinsSelection}
							>
								{generateNumberOptionsElements(0,qtyAvailable)}
							</select>
						</div>
					</div>
				</div>
				{qtyCabinsSelection.get(typeName) === 0? "" :
					<p className="text-end mt-1 mb-0">Ha seleccionado&nbsp;
						<strong>
							{qtyCabinsSelection.get(typeName)} {qtyCabinsSelection.get(typeName) === 1? "cabaña":"cabañas"} {typeName}:
						</strong><br/>
						Suma una <strong>capacidad para&nbsp;
							{typeName === "Couple Room"? qtyCabinsSelection.get(typeName)*capacity : qtyCabinsSelection.get(typeName)*capacity/2} adultos&nbsp;
							{typeName === "Couple Room"? "" : `y ${qtyCabinsSelection.get(typeName)*capacity/2} niños`}</strong>
					</p>}
			</div>
			<Modal className="modal fade" show={showModal} onHide={() => setShowModal(false)}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id={`modal${typeName}Label`}>
								{`${typeName}, capacidad máxima de ${capacity} personas`}
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<ul className="col ul-cabin-details">
										<li className="mb-2">
											Camas:
											<ul>
												<li>1 Cama Queen para 2 adultos (o para un adulto y un niño).</li>
												{typeName === "Tiny Cabin" ? <li>1 Litera de 2 camas para niños (o para 2 adultos pequeños).</li> : ""}
											</ul>
										</li>
										<li className="mb-2">
											{(() => {
												let result = "Comodidades: ";
												for (const amenitie of amenities) {
													result += `${amenitie}, `;
												}
												return result.slice(0, result.length - 3);
											})()}
										</li>
										<li className="mb-2">{`Area de la cabaña: ${size} m²`}</li>
										<li className="mb-2">{`Precio de cabaña por noche: $${numberWithDot(pricePerNight)}`}</li>
										<li className="mb-2">{`Precio de tinaja por instancia (1 día): $${numberWithDot(priceHotTubPerInstance)}`}</li>
									</ul>
								</div>
								<div />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-primary" data-bs-dismiss="modal">
									Ver fotos de la {typeName}
								</button>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</article>
	);
};

export default SelectCabin;
