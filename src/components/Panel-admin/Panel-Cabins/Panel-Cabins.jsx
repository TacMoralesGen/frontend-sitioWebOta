/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaHome, FaCheckCircle, FaTimesCircle, FaClock, FaEdit, FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { createCabana, getCabanas, updateCabana } from "../../../../api";
import { getCabinsTypes, getChangedValues } from "../../../scripts/utils";
// Import components
import CabinFormModal from "./CabinFormModal";
import CabinEditModal from "./CabinEditModal";

const getStatusInfo = (status) => {
	switch (status) {
		case "Activa":
			return { color: "bg-success", icon: <FaCheckCircle /> };
		case "Inactiva":
			return { color: "bg-secondary", icon: <FaClock /> };
	}
};

const PanelCabins = () => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [currentCabin, setCurrentCabin] = useState(null);
	const [cabins, setCabins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [cabinTypes, setCabinTypes] = useState([]);
	const [fetchAgain, setFetchAgain] = useState(false);

	useEffect(() => {
		const fetchCabins = async () => {
			try {
				setLoading(true);
				const { cabins } = await getCabanas();
				console.log(cabins);
				setCabins(cabins);
				setCabinTypes(getCabinsTypes(cabins));
				setError(null);
			} catch (err) {
				setError(err.message);
				console.error("Error al obtener la disponibilidad de las cabañas:", err);
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 1 * 1000);
				// setLoading(false);
			}
		};
		fetchCabins();
	}, [fetchAgain]);

	async function handleSaveCabin(newCabin) {
		try {
			setLoading(true);
			const { cabin } = await createCabana(newCabin);
			console.log(cabin);
			setShowAddModal(false);
			setFetchAgain(fetchAgain ? false : true);
			setError(null);
		} catch (err) {
			setError(err.message);
			console.error("Error al crear la cabaña:", err);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1 * 1000);
			// setLoading(false);
		}
	}

	async function handleUpdateCabin(updatedCabin) {
		try {
			setLoading(true);
      const newData = getChangedValues(currentCabin, updatedCabin)
			const { cabin } = await updateCabana({cabin: newData, _id: currentCabin._id});
			console.log(cabin);
			setShowEditModal(false);
			setFetchAgain(fetchAgain ? false : true);
			setError(null);
		} catch (err) {
			setError(err.message);
			console.error("Error al actualizar la cabaña:", err);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1 * 1000);
			// setLoading(false);
		}
	}

	const handleEditClick = (cabin) => {
		setCurrentCabin(cabin);
		setShowEditModal(true);
	};

	return loading ? (
		<section className="container-fluid mt-4">
			<div className="spinner-border text-primary" role="status"></div>
			<span>Cargando...</span>
		</section>
	) : (
		<section className="container mt-4">
			<h2 className="text-center mb-4">Estado de las Cabañas</h2>
			<div className="row g-3">
				{cabins.map((cabin) => {
					const { color, icon } = getStatusInfo(cabin.statusCabin);
					return (
						<div key={cabin._id} className="col-md-3 col-sm-6">
							<div className={`card text-white ${color} p-2 shadow d-flex flex-row align-items-center`}>
								<div className="me-2">
									<FaHome className="text-white" style={{ fontSize: "2.5rem" }} />
								</div>
								<div>
									<h5 className="card-title mb-1" style={{ fontSize: "1rem" }}>
										{`${cabin.number} - ${cabin.typeName}`}
									</h5>
									<p className="fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
										Capacidad: {cabin.capacity} personas
									</p>
									<span className="badge bg-light text-dark" style={{ fontSize: "0.8rem" }}>
										<button className="btn btn-sm btn-light ms-auto" onClick={() => handleEditClick(cabin)}>
											<FaEdit />
										</button>
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="text-center my-4">
				<button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
					<FaPlus /> Agregar Cabaña
				</button>
			</div>

			{/* Add Cabin Modal */}
			<CabinFormModal 
				show={showAddModal} 
				handleClose={() => setShowAddModal(false)} 
				createCabin={handleSaveCabin} 
			/>
			
			{/* Edit Cabin Modal */}
			<CabinEditModal
				show={showEditModal}
				handleClose={() => setShowEditModal(false)}
				updateCabin={handleUpdateCabin}
				cabin={currentCabin}
			/>
		</section>
	);
};

export default PanelCabins;